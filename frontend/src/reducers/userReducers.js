const {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} = require("../constants/userConstants");

function userLoginStatusReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { loading: false, loginStatus: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
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
    case USER_AUTH_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_AUTH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export {
  userLoginStatusReducer,
  userRegisterReducer,
  userDetailsReducer,
};
