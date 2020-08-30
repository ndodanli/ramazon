import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userRegisterReducer,
  userDetailsReducer,
  userLoginStatusReducer,
} from "./reducers/userReducers";
import { orderCreateReducer } from "./reducers/orderReducers";
// const cartItems = Cookie.getJSON("cartItems") || [];
// const initialState = {
//   cart: { cartItems, shipping: {}, payment: {} },
//   userDetails: { userInfo: {} },
//   productList: { products: [], totalItemCount: 0 },
//   productDetails: { product: {} },
// };
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLoginStatus: userLoginStatusReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
  });
