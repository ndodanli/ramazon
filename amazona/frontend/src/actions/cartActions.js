import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "../constants/cartConstants";
import Cookie from "js-cookie";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    await Axios.get("/api/products/" + productId).then(
      (response) => {
        dispatch({
          type: CART_ADD_ITEM,
          payload: {
            product: response.data._id,
            name: response.data.name,
            image: response.data.image,
            price: response.data.price,
            countInStock: response.data.countInStock,
            qty,
          },
        });
      }
    );
    const {
      cart: { cartItems },
    } = getState();

    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_SHIPPING, payload: data})
}

const savePayment = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_PAYMENT, payload: data})
}
export { addToCart, removeFromCart, saveShipping, savePayment };
