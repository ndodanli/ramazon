import React, { useEffect, useContext } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/userActions";
import { LoadContext } from "../App";
import { isEmpty } from "./Utility";
import { Redirect } from "react-router-dom";

const withAuthentication = (AuthComponent) => (props) => {
  const dispatch = useDispatch();
  const { updateSamePage } = useContext(LoadContext);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, userInfo } = userDetails;
  useEffect(() => {
    console.log("useeffect withAuthentication");
    dispatch(auth());
  }, [updateSamePage]);

  console.log("loading AUTH", loading);
  return loading || loading === undefined ? (
    <div>WITHAUTH LOADING</div>
  ) : !props.onlyForAuth ? (
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
  );
};

export default withAuthentication;
