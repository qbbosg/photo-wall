const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.createMessage);
router.get('/', messageController.getMessages);
router.get('/all', messageController.getAllMessages);
router.get('/pending', messageController.getAllPendingMessages);
router.patch('/approve/:id', messageController.approveMessage);
router.patch('/reject/:id', messageController.rejectMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;