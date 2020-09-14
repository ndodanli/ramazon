import React, { useEffect, useContext, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProduct } from "../actions/productActions";
import Paginate from "../components/Paginate";
import { LoadContext } from "../App";
import CustomLink from "../components/CustomLink";
import withAuthentication from "../components/withAuthentication";
import Cookies from "js-cookie";
import { getToken, getInfo, isAuth } from "../util";
function HomeScreen(props) {
  console.log("props", props);
  const preventFirstRender = useRef(true);
  const productList = useSelector((state) => state.productList);
  const { products, totalItemCount, loading, error } = productList;
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;
  const searchParams = getParams(window.location.search);
  const { loadRef } = useContext(LoadContext);
  const numOfItemsInPage = 32,
    path = "/search",
    maxPage = 5;
  const dispatch = useDispatch();
  // const ps = new PaymentScreen();
  // ps._self.__proto__.submitHandler()
  // console.log("productList", productList);
  // console.log("loading STATE HOME SCREEN", loading);
  useEffect(() => {

  }, []);
  useEffect(() => {
    console.log("HOME SCREEN USEEFFECT LOADING");
    if (loading === false) {
      loadRef.current.complete();
      // console.log("worked");
    }
  }, [loading]);
  //compare two branch(loading auth repeating)
  console.log("props HOME", props.location);
  console.log("loading HOME", loading);
  console.log("products", products);
  return loading === undefined ? (
    <Fragment>
      <ul className="products">
        {[...Array(numOfItemsInPage).keys()].map((key) => {
          return (
            <li key={key}>
              {console.log("PRODUCTS LOADING TEST")}
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
              {console.log("PRODUCTS TEST")}
              <div className={`product`}>
                <CustomLink loading to={`/product/${product._id}`}>
                  <img
                    className="product-image "
                    src={product.image}
                    alt="product"
                  />{" "}
                </CustomLink>
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
export default withAuthentication(HomeScreen);
