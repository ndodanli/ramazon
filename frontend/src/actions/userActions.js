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
import Axios from "axios";
const signin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
  Axios({
    method: "POST",
    data: {
      username: username,
      password: password,
    },
    withCredentials: true,
    url: "api/users/signin",
  }).then((res) => console.log(res));
};

const register = (userName, name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { userName, email, name, password } });
  await axios
    .post(
      "/api/users/register",
      { userName, name, email, password },
      {
        withCredentials: true,
      }
    )
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
