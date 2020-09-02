import React, { useContext, useEffect, useRef } from "react";
import { Route, Redirect } from "react-router";
import { connect, useDispatch } from "react-redux";
import { LoadContext } from "../App";
import { auth } from "../actions/userActions";
import { isEmpty } from "./Utility";
import { LOCATION_CHANGE } from "connected-react-router";

const AuthRoute = ({
  component: AuthComponent,
  loading,
  userInfo,
  onlyForAuth,
  location,
  ...rest
}) => {
  const { preventFirstRender, setPreventFirstRender } = useContext(LoadContext);
  const dispatch = useDispatch();
  console.log("loading AUTH", loading);
  useEffect(() => {
    console.log("useeffect authroute");
    dispatch(auth());
  }, []);
  return loading || loading === undefined ? (
    <div>Loading...</div>
  ) : (
    <Route
      {...console.log("WORKED")}
      {...rest}
      render={(props) =>
        !onlyForAuth ? (
          <AuthComponent {...props} />
        ) : isEmpty(userInfo) ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        ) : (
          <AuthComponent {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  loading: state.userDetails.loading,
  userInfo: state.userDetails.userInfo,
  loadingProduct: state.productList.loading,
});

export default connect(mapStateToProps)(AuthRoute);
