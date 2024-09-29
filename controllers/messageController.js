const Message = require('../models/messageModel');
const { getPage, getPageData, successResponse, errorResponse } = require('../utils/page');
exports.createMessage = async (req, res) => {
  const { content } = req.body;
  try {
    await Message.createMessage(content);
    successResponse(res, 201, null, 'Message created successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to create message');
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { limit, offset } = getPage(req, res);
    const messages = await Message.getMessages(limit, offset);
    const pageData = getPageData(messages, limit, offset); 
    successResponse(res, 200, pageData, 'Messages fetched successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to get messages');
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const { limit, offset } = getPage(req, res);
    const messages = await Message.getAllMessages(limit, offset);
    const pageData = getPageData(messages, limit, offset);
    successResponse(res, 200, pageData, 'All messages fetched successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to get all messages');
  }
};
exports.getAllPendingMessages = async (req, res) => {
  try {
    const { limit, offset } = getPage(req, res);
    const messages = await Message.getAllPendingMessages(limit, offset);
    const pageData = getPageData(messages, limit, offset);
    successResponse(res, 200, pageData, 'All pending messages fetched successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to get all pending messages');
  }
};

exports.approveMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Message.approvedMessage(id);
    if (result.affectedRows === 0) {
      return errorResponse(res, 400, null, 'Message is either already approved or does not exist.');
    }
    successResponse(res, 202, null, 'Message approved successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to approve message');
  }
};

exports.rejectMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Message.rejectMessage(id);
    if (result.affectedRows === 0) {
      return errorResponse(res, 400, null, 'Message is either already rejected or does not exist.');
    }
    successResponse(res, 202, null, 'Message rejected successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to reject message');
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Message.deleteMessage(id);
    if (result.affectedRows === 0) {
      return errorResponse(res, 400, null, 'Message is either already deleted or does not exist.');
    }
    successResponse(res, 202, null, 'Message deleted successfully');
  } catch (error) {
    errorResponse(res, 500, error.message, 'Failed to delete message');
  }
};
