import mongoose from "mongoose";
const userScheme = new mongoose.Schema({
  name: { type: String, required: true },
  username: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const userModel = mongoose.model("User", userScheme);

export default userModel;
