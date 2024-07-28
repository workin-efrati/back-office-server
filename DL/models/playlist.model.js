import mongoose from "mongoose"

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    list: [{ type: mongoose.Schema.Types.ObjectId, ref: "vod" }],
})
const playlistModel = mongoose.models["tag"] || mongoose.model("playlist", playlistSchema)
export default playlistModel