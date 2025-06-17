// routes/soothingImageRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const SoothingImage = require("../models/SoothingImage");
const auth = require("../middleware/authMiddleware");

// 🧠 Setup multer to store uploaded files in /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.userId}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ✅ GET current user's soothing image
router.get("/", auth, async (req, res) => {
  const image = await SoothingImage.findOne({ user: req.userId }).sort({ addedAt: -1 });
  res.json(image || {});
});

// ✅ POST uploaded image file
router.post("/", auth, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imageUrl = `/uploads/${req.file.filename}`; // Relative URL to serve

  const existing = await SoothingImage.findOneAndUpdate(
    { user: req.userId },
    { imageUrl, addedAt: new Date() },
    { new: true, upsert: true }
  );

  res.status(201).json(existing);
});

module.exports = router;
