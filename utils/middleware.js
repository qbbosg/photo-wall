const multer = require('multer');
const authMiddleware = (req, res, next) => {
  // 实现认证中间件逻辑
  next();
};

const multerUpload = multer({ dest: 'uploads/' });

module.exports = {
  authMiddleware,
  multerUpload
};