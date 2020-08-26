import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../actions/cartActions";
import LinkLoading from "./LinkLoading";
function CartSection() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const closeCartSection = () => {
    document.querySelector('.cart-link').click();
  }
  return (
    <div className="cart-section hidden visuallyhidden">
      <div className="cart-section-flex">
        <h3 className="cart-header">Cart</h3>
        {cartItems.map((item) => {
          return (
            <div key={item.product} className="cart-item-container">
              <div className="cart-item">{item.name}</div>
              <div className="cart-item">{`Adet:${item.qty}`}</div>
              <button
                className="cross-mark"
                value={item.product}
                onClick={(e) => handleRemove(e.target.value)}
              >
                &#10060;
              </button>
            </div>
          );
        })}
        <LinkLoading onClick={closeCartSection} className="go-to-cart" to="/cart">Go to Cart</LinkLoading>
      </div>
    </div>
  );
}

export default CartSection;
