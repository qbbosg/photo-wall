const Message = require('../models/messageModel');
const Photo = require('../models/photoModel');

exports.search = async (req, res) => {
  const { query } = req.query;
  try {
    const messages = await Message.searchMessages(query);
    const photos = await Photo.searchPhotos(query);
    res.json({ messages, photos });
  } catch (error) {
    res.status(500).send(error.message);
  }
};