const Message = require('../models/messageModel');
const Photo = require('../models/photoModel');
const { getPage, getPageData, successResponse, errorResponse } = require('../utils/page');
exports.search = async (req, res) => {
  const { query } = req.query;
  const { limit, offset } = getPage(req, res);
  const searchType = req.query.type;
  try {
    if (searchType === 'photo') {
      const photos = await Photo.searchPhotos(query, limit, offset);
      const pageData = getPageData(photos, limit, offset);
      successResponse(res, 200, pageData, 'Photos fetched successfully');
    } else {
      const messages = await Message.searchMessages(query, limit, offset);
      const pageData = getPageData(messages, limit, offset);
      successResponse(res, 200, pageData, 'Messages fetched successfully');
    }
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to search');
  }
};