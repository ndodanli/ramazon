const {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_AUTH_CLEAN,
  USER_LOGIN_CLEAN,
} = require("../constants/userConstants");

function userLoginStatusReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, loginStatus: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT_REQUEST:
      return { loading: true };
    case USER_LOGOUT_SUCCESS:
      return { loading: false, loginStatus: action.payload };
    case USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function userDetailsReducer(state = { userInfo: {} }, action) {
  switch (action.type) {
    case USER_AUTH_REQUEST:
      return { loading: true, userInfo: {} };
    case USER_AUTH_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_AUTH_FAIL:
      return { loading: false, error: action.payload };
    case USER_AUTH_CLEAN:
      return { userInfo: {} };
    default:
      return state;
  }
}
export {
  userLoginStatusReducer,
  userRegisterReducer,
  userDetailsReducer,
};
