// models/FavoriteVideo.js
const mongoose = require("mongoose");

const favoriteVideoSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  tag: { type: String, default: "Untagged" }, // ✅ This must be included
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  addedAt: Date,
});

module.exports = mongoose.model("FavoriteVideo", favoriteVideoSchema);
