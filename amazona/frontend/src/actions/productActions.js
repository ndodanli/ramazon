import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../constants/productConstants';
import { PRODUCT_CATEGORY_REQUEST, PRODUCT_CATEGORY_SUCCESS, PRODUCT_CATEGORY_FAIL } from "../constants/categoryConstants";

const listProduct = (searchParams, numOfItemsInPage) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    axios
      .post("/api/products/home/" , {searchParams, numOfItemsInPage})
      .then((response) =>
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data })
      );
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response.data.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  if (!product._id) {
    await axios
      .post("/api/products", product, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((response) =>
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: response.data })
      )
      .catch((error) =>
        dispatch({
          type: PRODUCT_SAVE_FAIL,
          payload: error.response.data.message,
        })
      );
  } else {
    console.log("product._id", product._id);
    await axios
      .put("/api/products/" + product._id, product, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((response) =>
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: response.data })
      )
      .catch((error) =>
        dispatch({
          type: PRODUCT_SAVE_FAIL,
          payload: error.response.data.message,
        })
      );
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  axios
    .get("/api/products/" + productId)
    .then((response) => {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data });
    })
    .catch((error) =>
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      })
    );
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId, success:false });
  console.log('action')
  axios
    .delete("/api/products/" + productId, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
    })
    .then((response) => {
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: response.data,
        success: true,
      });
    })
    .catch((error) =>
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: error.response.data.message,
      })
    );
};

const productsByCategory = (category) => async (dispatch) => {
dispatch({type:PRODUCT_CATEGORY_REQUEST, payload: category})
try {
  axios.get('/api/products/categories/' + category.toLowerCase())
  .then(response => dispatch({type: PRODUCT_CATEGORY_SUCCESS, payload:response.data}))
} catch (error) {
  dispatch({type:PRODUCT_CATEGORY_FAIL, payload: error.response.data.message})
}
}
export { listProduct, detailsProduct, saveProduct, deleteProduct, productsByCategory };
