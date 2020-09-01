import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/userActions";
import { LoadContext } from "../App";
const withAuthentication = (WrappedComponent) => (props) => {
  const {
    updateSamePage,
    preventFirstRender,
    setPreventFirstRender,
  } = useContext(LoadContext);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading } = userDetails;
  console.log("loading WRAPPER", loading);
  console.log("preventFirstRender", preventFirstRender);
  useEffect(() => {
    setPreventFirstRender(false);
    dispatch(auth());
  }, [updateSamePage]);
  //if(statement) As long as the expression inside the parentheses returns something other
  //than false, null, 0, "" or undefined. the block in the if statement will
  // be executed
  return loading || preventFirstRender ? (
    <div>WITHAUTH LOADING</div>
  ) : (
    <WrappedComponent {...props} />
  );
};
export default withAuthentication;
