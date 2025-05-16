const PersonalImage = require('../models/PersonalImage');

// GET all images for the logged-in user
exports.getImages = async (req, res) => {
  try {
    const images = await PersonalImage.find({ user: req.userId }).sort({ addedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

// POST new image for the logged-in user
exports.addImage = async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const newImage = new PersonalImage({ imageUrl, user: req.userId });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save image' });
  }
};

// DELETE image only if owned by the logged-in user
exports.deleteImage = async (req, res) => {
  try {
    const image = await PersonalImage.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!image) return res.status(404).json({ error: 'Image not found or unauthorized' });
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
