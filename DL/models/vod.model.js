import mongoose, { models } from "mongoose";

const vodSchema = new mongoose.Schema(
  {
    title: { type: String,required:true },
    description: { type: String },
    link: { type: String,required:true },
    img: { type: String },
  },
  { timestamps: true }
);
const vodModel = models["vod"] || mongoose.model("vod", vodSchema);
export default vodModel;
