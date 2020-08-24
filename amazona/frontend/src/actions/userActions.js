import axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";
const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  await axios
    .post("/api/users/signin", { email, password })
    .then((response) => {
      console.log("data", response.data);
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
      Cookie.set("userInfo", JSON.stringify(response.data));
    })
    .catch((error) => {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload: error.response.data.message,
      });
    });
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, name, password } });
  await axios
    .post("/api/users/register", { name, email, password })
    .then((response) => {
      console.log("data", response.data);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
      Cookie.set("userInfo", JSON.stringify(response.data));
    })
    .catch((error) => {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.message,
      });
    });
};

export { signin, register };
