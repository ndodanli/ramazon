import axios from "axios";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  USER_LOGOUT_FAIL,
} from "../constants/userConstants";
import { push } from "connected-react-router";
const login = (username, password, kmLoggedIn, rememberMe) => async (
  dispatch
) => {
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
  try {
    const { data } = await axios.get("/api/users/logout");
    if (!data) {
      dispatch(push("/login"));
    }
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response.data });
  }
};

const register = (userName, name, email, password) => async (dispatch) => {
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
  try {
    const { data } = await axios.get("/api/users/user");
    dispatch({ type: USER_AUTH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_AUTH_FAIL, payload: error.response.data });
  }
};
export { login, register, auth, logout };
