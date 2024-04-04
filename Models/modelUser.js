import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  status: Boolean,
});

export default mongoose.model("users", userModel);
