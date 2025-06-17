const mongoose = require("mongoose");

const soothingImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SoothingImage", soothingImageSchema);
