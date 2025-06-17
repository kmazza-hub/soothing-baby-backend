// models/FavoriteVideo.js
const mongoose = require("mongoose");

const favoriteVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  tag: { type: String, default: "Untagged" }, // ✅ Added tag field
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FavoriteVideo", favoriteVideoSchema);
