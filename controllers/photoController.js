const Photo = require('../models/photoModel');
const { upload } = require('../utils/upload');
const path = require('path');
const fs = require('fs');
const { generateThumbnail } = require('../utils/thumbnail');
const { getPage, getPageData, successResponse, errorResponse } = require('../utils/page');
exports.upload = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user ? req.user.id : null;
    const { caption } = req.body;
    const photoPath = file.path;
    const thumbnailFolderPath = 'uploads/thumbnail';
    if (!fs.existsSync(thumbnailFolderPath)) {
      fs.mkdirSync(thumbnailFolderPath);
    }
    const thumbnailPath = `${thumbnailFolderPath}/${file.filename}`;
    await generateThumbnail(photoPath, thumbnailPath);

    await Photo.uploadPhoto(caption, photoPath, thumbnailPath, userId);
    successResponse(res, 201, null, 'Photo uploaded successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to upload photo');
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const { limit, offset } = getPage(req, res);
    const photos = await Photo.getPhotos(limit, offset);
    const pageData = getPageData(photos, limit, offset);
    successResponse(res, 200, pageData, 'Photos fetched successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to get photos');
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    const { limit, offset } = getPage(req, res);
    const photos = await Photo.getAllPhotos(limit, offset);
    const pageData = getPageData(photos, limit, offset);
    successResponse(res, 200, pageData, 'All photos fetched successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to get all photos');
  }
};
exports.getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await Photo.getPhotoById(id);
    successResponse(res, 200, photo, 'Photo fetched successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to get photo');
  }
}; 
exports.approvePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Photo.approvePhoto(id);
    if (result.affectedRows === 0) {
      return errorResponse(res, 400, null, 'Photo is either already approved or does not exist.');
    }
    successResponse(res, 202, null, 'Photo approved successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to approve photo');
  }
};
exports.rejectPhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Photo.rejectPhoto(id);
    if (result.affectedRows === 0) {
      return errorResponse(res, 400, null, 'Photo is either already rejected or does not exist.');
    }
    successResponse(res, 202, null, 'Photo rejected successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to reject photo');
  }
};
exports.deletePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Photo.deletePhoto(id);
    if (result.affectedRows === 0) {
      return errorResponse(res, 400, null, 'Photo is either already deleted or does not exist.');
    }
    successResponse(res, 202, null, 'Photo deleted successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to delete photo');
  }
}; 