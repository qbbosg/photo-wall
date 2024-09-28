const Message = require('../models/messageModel');

exports.createMessage = async (req, res) => {
  const { content } = req.body;
  try {
    const result = await Message.createMessage(content);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};