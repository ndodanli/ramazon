import React, { useEffect, useContext, useRef, Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProduct } from "../actions/productActions";
import Paginate from "../components/Paginate";
import { LoadContext } from "../App";
import { PRODUCT_LIST_CLEAN } from "../constants/productConstants";
import LinkLoading from "../components/LinkLoading";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import Axios from "axios";

function HomeScreen(props) {
  const preventFirstRender = useRef(true);
  const productList = useSelector((state) => state.productList);
  const { products, totalItemCount, loading, error } = productList;
  const searchParams = getParams(window.location.search);
  const { loadRef } = useContext(LoadContext);
  const numOfItemsInPage = 32,
    path = "/search",
    maxPage = 5;
  const dispatch = useDispatch();
  // const ps = new PaymentScreen();
  // ps._self.__proto__.submitHandler()
  console.log("productList", productList);
  console.log("loading STATE HOME SCREEN", loading);
  
  useEffect(() => {
    console.log("HOME SCREEN USEEFFECT DEPENDENCIES");
    dispatch(listProduct(searchParams, numOfItemsInPage));
    return () => {
      console.log("RETURN WORKED CLEAN");
      dispatch({ type: PRODUCT_LIST_CLEAN });
    };
  }, []);

  useEffect(() => {
    if (!preventFirstRender.current) {
      console.log("HOME SCREEN USEEFFECT LOADING");
      if (loading === false) {
        console.log("worked");
        loadRef.current.complete();
      }
    }
    preventFirstRender.current = false;
  }, [loading]);

  return loading ? (
    <Fragment>
      <ul className="products">
        {[...Array(numOfItemsInPage).keys()].map((key) => {
          return (
            <li key={key}>
              <div className="product">
                <div className="product-image loading"> </div>
                <div className="product-name loading"> </div>
                <div className="product-category loading"></div>
                <div className="product-brand loading"></div>
                <div className="product-price loading"></div>
                <div className="product-rating loading"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </Fragment>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Fragment>
      <ul className="products">
        {products.map((product) => {
          return (
            <li key={product._id}>
              <div className={`product`}>
                <LinkLoading to={`/product/${product._id}`}>
                  <img
                    className="product-image "
                    src={product.image}
                    alt="product"
                  />{" "}
                </LinkLoading>
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

const checkStateAndCompleteLoader = (loadRef, setLoadState) => {
  console.log("loadRef", loadRef);
  loadRef.current.complete();
  setLoadState(false);
};

const getParams = (locationSearch) => {
  const urlSearchParams = new URLSearchParams(locationSearch);
  return {
    q: urlSearchParams.get("q") ?? "",
    page:
      Number(urlSearchParams.get("page")) <= 0
        ? 1
        : Number(urlSearchParams.get("page")),
    category: urlSearchParams.get("category") ?? "",
  };
};
export default HomeScreen;
