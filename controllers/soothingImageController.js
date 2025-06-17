const SoothingImage = require("../models/SoothingImage");

// Get latest image for the user
exports.getImage = async (req, res) => {
  try {
    const image = await SoothingImage.findOne({ user: req.userId }).sort({ uploadedAt: -1 });
    if (!image) return res.json({ imageUrl: null });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

// Save a new image
exports.uploadImage = async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const newImage = new SoothingImage({ imageUrl, user: req.userId });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ error: "Failed to upload image" });
  }
};
