import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signin, auth } from "../actions/userActions";
import Axios from "axios";
import { USER_AUTH_CLEAN, USER_SIGNIN_CLEAN } from "../constants/userConstants";
import { LoadContext } from "../App";
function SigninScreen(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [kmSignedIn, setKmSignedIn] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const userLoginStatus = useSelector((state) => state.userLoginStatus);
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingSignin,
    loginStatus,
    error: errorSignin,
  } = userLoginStatus;
  const {
    loading: loadingUserAuth,
    userInfo,
    error: errorUserAuth,
  } = userDetails;
  const { loadRef } = useContext(LoadContext);
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const redirect = searchParams.get("redirect") ?? "/";

  useEffect(() => {
    const remMe = JSON.parse(localStorage.getItem("remMe"));
    if (remMe) {
      setUserName(remMe.username);
    }
    if (userInfo?._id) props.history.push(redirect);
  }, []);

  useEffect(() => {
    if (loginStatus === true) props.history.push(redirect);
  }, [loginStatus]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(userName, password, kmSignedIn, rememberMe));
  };

  return userInfo?._id ? (
    <div>You are already logged in</div>
  ) : (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loadingSignin && <div>Loading...</div>}
            {errorSignin && <div>{errorSignin}</div>}
          </li>
          <li>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>
            <div className="km-signed-in">
              <div>
                <input
                  id="kmSignedIn"
                  type="checkbox"
                  name="kmSignedIn"
                  checked={kmSignedIn}
                  onChange={() => setKmSignedIn((prevState) => !prevState)}
                />
                <label htmlFor="rememberMe">Keep me signed in?</label>
              </div>
              <div>
                <input
                  id="rememberMe"
                  type="checkbox"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prevState) => !prevState)}
                />
                <label htmlFor="kmSignedIn">Remember Me?</label>
              </div>
            </div>
          </li>
          <li>New to amazona?</li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : "register?redirect=" + redirect
              }
              className="button secondary text-center"
            >
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

function isEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
}

export default SigninScreen;
