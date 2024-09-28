const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const upload = require('../utils/upload');

router.post('/upload', upload.single('photo'), photoController.upload);
router.get('/', photoController.getPhotos);

module.exports = router;