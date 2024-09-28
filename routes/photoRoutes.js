const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const upload = require('../utils/middleware').multerUpload;

router.post('/upload', upload.single('photo'), photoController.upload);

module.exports = router;