import mongoose from "mongoose";

const QASchema = new mongoose.Schema({
  title: { type: String },
  isTitledApproved: { type: Boolean },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
  date: { type: Date, required: true, default: Date.now },
  isActive: { type: Boolean, default: true },
});
 const QAModel = mongoose.model("qa", QASchema);
 export default QAModel

