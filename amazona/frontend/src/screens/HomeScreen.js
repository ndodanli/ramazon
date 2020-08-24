import React, { useEffect, useContext, useRef, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProduct } from "../actions/productActions";
import Paginate from "../components/Paginate";
function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, totalItemCount, loading, error } = productList;
  const searchParams = getParams(window.location.search);
  const dependencies = Object.values(searchParams);
  const numOfItemsInPage = 30,
    path = "/search",
    maxPage = 5;
  const dispatch = useDispatch();
  // const ps = new PaymentScreen();
  // ps._self.__proto__.submitHandler()
  useEffect(() => {
    console.log("useEffect WORKED");

    dispatch(listProduct(searchParams, numOfItemsInPage));
  }, dependencies);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : products.length === 0 ? (
    <div>No Product Found</div>
  ) : (
    <Fragment>
      <ul className="products">
        {products.map((product) => {
          return (
            <li key={product._id}>
              <div className="product">
                <Link to={`/product/${product._id}`}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />{" "}
                </Link>
                <div className="product-name">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </div>
                <div className="product-category">{product.category}</div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">{product.price + "$"}</div>
                <div className="product-rating">
                  {product.rating} Stars ({product.numRewiews} Reviews)
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Paginate
        path={path}
        page={searchParams.page}
        numOfItemsInPage={numOfItemsInPage}
        totalItemCount={totalItemCount}
        maxPage={maxPage}
      />
    </Fragment>
  );
}

const getParams = (locationSearch) => {
  console.log('test')
  const urlSearchParams = new URLSearchParams(locationSearch);
  return {
    q: urlSearchParams.get("q") ?? "",
    page: Number(urlSearchParams.get("page")) ?? "",
    category: urlSearchParams.get("category") ?? "",
  };
};
export default HomeScreen;
