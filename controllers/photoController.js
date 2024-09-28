const Photo = require('../models/photoModel');
const upload = require('../utils/upload');

exports.upload = async (req, res) => {
  try {
    const { caption } = req.body;
    const photoPath = req.file.path;
    console.log(caption, photoPath);
    const result = await Photo.uploadPhoto(caption, photoPath);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.getPhotos();
    res.json(photos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};