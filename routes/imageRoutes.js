const express = require('express');
const router = express.Router();
const { getImages, addImage, deleteImage } = require('../controllers/imageController');
const auth = require('../middleware/authMiddleware');


router.get('/images', auth, getImages);
router.post('/images', auth, addImage);
router.delete('/images/:id', auth, deleteImage);



module.exports = router;
