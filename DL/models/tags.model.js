import mongoose from "mongoose";

const TagsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "tag" },
    topicImages: [String],
    popular: Boolean,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const tagsModel = mongoose.models["tag"] || mongoose.model("tag", TagsSchema);

export default tagsModel;
