import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/userActions";
import { USER_AUTH_CLEAN } from "../constants/userConstants";
import { PRODUCT_LIST_CLEAN } from "../constants/productConstants";
function AuthWrapper({children}) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading } = userDetails;
  const preventFirstRender = useRef(true);
  console.log("loading WRAPPER", loading);
  useEffect(() => {
    preventFirstRender.current = false;
    dispatch(auth());
  }, []);
  //if(statement) As long as the expression inside the parentheses returns something other
  //than false, null, 0, "" or undefined. the block in the if statement will
  // be executed
  return loading || preventFirstRender.current ? (
    <div>Loading</div>
  ) : (
    children
  );
}

export default AuthWrapper;
