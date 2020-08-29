import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import Cookie from "js-cookie";
import {
  userSigninReducer,
  userRegisterReducer,
  userDetailsReducer,
  userSignoutReducer,
  userLoginStatusReducer,
} from "./reducers/userReducers";
import { orderCreateReducer } from "./reducers/orderReducers";
const cartItems = Cookie.getJSON("cartItems") || [];
const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userDetails: { userInfo: {} },
  productList: { products: [], totalItemCount: 0 },
  productDetails: { product: {} },
};
const reducer = combineReducers({
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
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
