import mongoose, { models } from "mongoose";

const vodSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    linkToVod: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);
const vodModel = models["vod"] || mongoose.model("vod", vodSchema);
export default vodModel;
