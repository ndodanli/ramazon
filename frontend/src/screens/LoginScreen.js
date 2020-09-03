import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import { push } from "connected-react-router";
import { LoadContext } from "../App";
import withAuthentication from "../components/withAuthentication";
function LoginScreen(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [kmLoggedIn, setKmLoggedIn] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const userLoginStatus = useSelector((state) => state.userLoginStatus);
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingLogin,
    loginStatus,
    error: errorLogin,
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
    if (userInfo?._id) {
      dispatch(push('/'));
    }
  }, []);

  useEffect(() => {
    if (loginStatus === true) props.history.push(redirect);
  }, [loginStatus]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(userName, password, kmLoggedIn, rememberMe));
  };

  return userInfo?._id ? (
    <div>You are already logged in</div>
  ) : (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Log-In</h2>
          </li>
          <li>
            {loadingLogin && <div>Loading...</div>}
            {errorLogin && <div>{errorLogin}</div>}
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
              Login
            </button>
          </li>
          <li>
            <div className="km-logged-in">
              <div>
                <input
                  id="kmLoggedIn"
                  type="checkbox"
                  name="kmLoggedIn"
                  checked={kmLoggedIn}
                  onChange={() => setKmLoggedIn((prevState) => !prevState)}
                />
                <label htmlFor="rememberMe">Keep me logged in?</label>
              </div>
              <div>
                <input
                  id="rememberMe"
                  type="checkbox"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prevState) => !prevState)}
                />
                <label htmlFor="kmLoggedIn">Remember Me?</label>
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

export default withAuthentication(LoginScreen);
