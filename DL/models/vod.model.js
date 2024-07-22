import mongoose from "mongoose";

const vodSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  linkToVod: { type: String },
});

const vodModel = mongoose.model("vod", vodSchema);
export default vodModel
