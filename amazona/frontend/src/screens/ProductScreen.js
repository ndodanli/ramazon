import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);
  const handleAddToCart = () => {
    dispatch(addToCart(product._id, qty))
    document.querySelector('.cart-link').click();
    
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

export default ProductScreen;
