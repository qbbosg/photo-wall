const getPage = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.pagesize) || 10;
  const offset = (page - 1) * limit;
  return { limit: limit.toString(), offset: offset.toString() };
};
const getPageData = (list, limit, offset) => {
  const total = list.length;
  const totalPages = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;
  const currentPageSize = parseInt(limit);
  return { total, totalPages, currentPage, currentPageSize, list };
};
const successResponse = (res, code, data, message) => {
  res.status(code).json({ code, data, message });
};
const errorResponse = (res, code, error, message) => {
  res.status(code).json({ code, error, message });
};

module.exports = { getPage, getPageData, successResponse, errorResponse };
