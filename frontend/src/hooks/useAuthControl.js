import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/userActions";
import Axios from "axios";

async function AuthControl() {
  try {
    const { data } = await Axios.get("/api/users/user");
    return data;
  } catch (error) {
    return error;
  }
}

export default AuthControl;
