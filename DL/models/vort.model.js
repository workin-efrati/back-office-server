import mongoose from "mongoose";

const vortDetailsSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true }
})

const vortSchema = new Schema({
  subject: { type: String, required: true },
  title: { type: String, required: true },
  vorts: [vortDetailsSchema],
  order: { type: Number, required: true }
});

const vortModel = mongoose.models["vort"] || mongoose.model("vort", vortSchema);
export default vortModel;
