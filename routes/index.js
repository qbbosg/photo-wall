const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const photoRoutes = require('./photoRoutes');
const messageRoutes = require('./messageRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/users', userRoutes);
router.use('/photos', photoRoutes);
router.use('/messages', messageRoutes);
router.use('/search', searchRoutes);

module.exports = router;