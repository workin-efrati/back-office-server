import mongoose from "mongoose";

const vodSchema = new mongoose.Schema(
  {
    title: { type: String,required:true },
    description: { type: String },
    link: { type: String,required:true },
    img: { type: String },
    isActive:{type:Boolean, default:true}
  },
  { timestamps: true }
);
const vodModel = mongoose.models["vod"] || mongoose.model("vod", vodSchema);
export default vodModel;
