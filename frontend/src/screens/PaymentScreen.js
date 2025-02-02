import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import withAuthentication from "../components/withAuthentication";
function PaymentScreen(props) {
  const [paymentMethod, setpaymentMethod] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod: paymentMethod }));
    props.history.push("placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setpaymentMethod(e.target.value)}
                />
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default withAuthentication(PaymentScreen);
