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
} from "../constants/productConstants";
import {
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
} from "../constants/categoryConstants";
import Axios from "axios";

const listProduct = (searchParams, numOfItemsInPage) => async (dispatch) => {
  try {
    const { data } = await Axios.post("/api/products/home/", {
      searchParams,
      numOfItemsInPage,
    });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
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
    try {
      const { data } = await Axios.post("/api/products", product, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_SAVE_FAIL,
        payload: error.response.data.message,
      });
    }
  } else {
    try {
      const { data } = await Axios.put(
        "/api/products/" + product._id,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_SAVE_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
    payload: productId,
    success: false,
  });
  try {
    const { data } = await Axios.delete("/api/products/" + productId, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
    });
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const productsByCategory = (category) => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_REQUEST, payload: category });
  try {
    const { data } = await Axios.get(
      "/api/products/categories/" + category.toLowerCase()
    );
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
export {
  listProduct,
  detailsProduct,
  saveProduct,
  deleteProduct,
  productsByCategory,
};
