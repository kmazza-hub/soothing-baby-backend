const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/soothingImageController");

router.get("/", auth, controller.getImage);
router.post("/", auth, controller.saveImage);

module.exports = router;
