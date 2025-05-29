import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);

export default Url;
