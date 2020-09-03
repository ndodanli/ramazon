import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";
import Cookie from "js-cookie";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const cartItems = Cookie.getJSON("cartItems") || [];

const store = configureStore({
  cart: { cartItems, shipping: {}, payment: {} },
  userDetails: { userInfo: {}, loading: undefined },
  productList: { products: [], totalItemCount: 0 },
  productDetails: { product: {} },
});
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <App />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
