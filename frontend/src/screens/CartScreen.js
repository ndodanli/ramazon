import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { LoadContext } from "../App";
import { isEmpty } from "../components/Utility";
import { push } from "connected-react-router";
import withAuthentication from "../components/withAuthentication";
function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;
  const { loadRef } = useContext(LoadContext);
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  console.log("props.location", props.location);
  useEffect(() => {
    console.log("USEEFFECT");
    if (cartItems) {
      loadRef.current.complete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkOutHandler = () => {
    if (isEmpty(userInfo)) dispatch(push("/login?redirect=shipping"));
    else dispatch(push("/shipping"));
  };
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[
                        ...Array(
                          item.countInStock !== 0 ? item.countInStock : item.qty
                        ).keys(),
                      ].map((qty) => {
                        return (
                          <option key={qty} value={qty + 1}>
                            {qty + 1}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items)
        </h3>
        : $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        <button
          onClick={checkOutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default withAuthentication(CartScreen);
