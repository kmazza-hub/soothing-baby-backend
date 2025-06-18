const mongoose = require("mongoose");

const favoriteVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  tag: { type: String, default: "Untagged" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addedAt: { type: Date, default: Date.now },
  sortOrder: { type: Number, default: 0 }, // ✅ NEW: Used for drag-and-drop order
});

module.exports = mongoose.model("FavoriteVideo", favoriteVideoSchema);
