const SoothingImage = require("../models/SoothingImage");

// GET the current user's soothing image
exports.getImage = async (req, res) => {
  try {
    const image = await SoothingImage.findOne({ user: req.userId }).sort({ addedAt: -1 });
    if (!image) return res.json({});
    res.json(image);
  } catch (err) {
    console.error("❌ Failed to fetch image:", err);
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

// POST or update soothing image for the user
exports.saveImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: "Missing imageUrl" });

    const updated = await SoothingImage.findOneAndUpdate(
      { user: req.userId },
      { imageUrl, addedAt: new Date() },
      { new: true, upsert: true }
    );

    res.status(201).json(updated);
  } catch (err) {
    console.error("❌ Failed to save image:", err);
    res.status(500).json({ error: "Failed to save image" });
  }
};
