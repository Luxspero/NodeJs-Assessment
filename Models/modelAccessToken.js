import mongoose from "mongoose";

const accessTokenModel = new mongoose.Schema({
  id_user: String,
  access_token: String,
  ip_address: String,
});

export default mongoose.model("access_tokens", accessTokenModel);
