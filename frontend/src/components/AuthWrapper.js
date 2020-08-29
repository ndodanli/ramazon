import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/userActions";
import { USER_AUTH_CLEAN } from "../constants/userConstants";
function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, userInfo, error } = userDetails;
  console.log('userInfo WRAPPER', userInfo)
  useEffect(() => {
    dispatch(auth());
  }, []);
  //if(statement) As long as the expression inside the parentheses returns something other
  //than false, null, 0, "" or undefined... the block in the if statement will
  // be executed
return Object.keys(userInfo).length === 0 ? <div>Loading</div> : children;
}

export default AuthWrapper;
