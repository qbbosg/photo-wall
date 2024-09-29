const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const upload = require('../utils/upload');

router.post('/upload', upload.single('photo'), photoController.upload);
router.get('/', photoController.getPhotos);
router.get('/all', photoController.getAllPhotos);
router.get('/:id', photoController.getPhotoById);
router.patch('/approve/:id', photoController.approvePhoto);
router.patch('/reject/:id', photoController.rejectPhoto);
router.delete('/:id', photoController.deletePhoto);

module.exports = router;