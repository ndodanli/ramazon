import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { LoadContext } from "../App";
import { PRODUCT_DETAILS_CLEAN } from "../constants/productConstants";
import withAuthentication from "../components/withAuthentication";
function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const { loadRef } = useContext(LoadContext);
  const dispatch = useDispatch();
  // console.log('productDetails', productDetails)
  // console.log("loading PRODUCT SCREEN", loading);

  useEffect(() => {
    console.log("PRODUCT SCREEN USEEFFECT", loading);

    dispatch(detailsProduct(props.match.params.id));
    return () => {
      dispatch({ type: PRODUCT_DETAILS_CLEAN });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log("PRODUCT SCREEN USEEFFECT LOADING");
    if (loading === false) {
      console.log("product screen COMPLETED");
      loadRef.current.complete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const handleAddToCart = () => {
    dispatch(addToCart(product._id, qty));
    document.querySelector(".cart-button").click();

    // props.history.push({
    //   pathname:
    //     "/cart/" +
    //     props.match.params.id +
    //     "?qty=" +
    //     qty,
    //   state: { stock: product.countInStock },
    // });
  };
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to results</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div> {error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt="product" />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                <h4>
                  {product.rating} Stars({product.numRewiews} Reviews)
                </h4>
              </li>
              <li>
                Price: <h4>${product.price}</h4>
              </li>
              <li>
                Description:
                <h4>{product.description}</h4>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price: {product.price}</li>
              <li>
                Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </li>
              <li>
                Qty:{" "}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="button primary">
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuthentication(ProductScreen);
