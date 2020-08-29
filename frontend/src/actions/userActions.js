import axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  USER_SIGNOUT_FAIL,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_REQUEST,
} from "../constants/userConstants";
import Axios from "axios";
const signin = (username, password, kmSignedIn, rememberMe) => async (
  dispatch
) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  if (rememberMe) {
    localStorage.setItem("remMe", JSON.stringify({ username: username }));
  } else {
    localStorage.removeItem("remMe");
  }
  try {
    const { data } = await axios.post(
      "api/users/signin",
      {
        username: username,
        password: password,
        kmSignedIn: kmSignedIn,
      },
      { withCredentials: true }
    );
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data });
  }
};

const signout = () => async (dispatch) => {
  dispatch({ type: USER_SIGNOUT_REQUEST });
  try {
    const { data } = await axios.get("api/users/signout");
    dispatch({ type: USER_SIGNOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNOUT_FAIL, payload: error.response.data });
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
export { signin, register, auth, signout };
