import axios from "axios";
import Cookie from "js-cookie";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
} from "../constants/userConstants";
import Axios from "axios";
const login = (username, password, kmLoggedIn, rememberMe) => async (
  dispatch
) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  if (rememberMe) {
    localStorage.setItem("remMe", JSON.stringify({ username: username }));
  } else {
    localStorage.removeItem("remMe");
  }
  try {
    const { data } = await axios.post(
      "api/users/login",
      {
        username: username,
        password: password,
        kmLoggedIn: kmLoggedIn,
      },
      { withCredentials: true }
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data });
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    const { data } = await axios.get("/api/users/logout");
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response.data });
  }
};

const register = (userName, name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { userName, email, name, password },
  });
  try {
    const { data } = await axios.post(
      "/api/users/register",
      { userName, name, email, password },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

const auth = () => async (dispatch) => {
  
  dispatch({ type: USER_AUTH_REQUEST });
  try {
    const { data } = await axios.get("/api/users/user");
    dispatch({ type: USER_AUTH_SUCCESS, payload: data });
  } catch (error) {
    
    dispatch({ type: USER_AUTH_FAIL, payload: error.response.data });
  }
};
export { login, register, auth, logout };
