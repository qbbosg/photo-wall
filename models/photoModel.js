const db = require("../db");

const uploadPhoto = async (caption, photoPath, thumbnailPath, userId) => {
  const sql = `INSERT INTO photos_v2 (caption, photo_path, thumbnail_path, user_id) VALUES (?, ?, ?, ?)`;
  const [result] = await db.execute(sql, [caption, photoPath, thumbnailPath, userId]);
  return result;
};

const getPhotos = async (limit, offset) => {
  const sql = `SELECT * FROM photos_v2 WHERE status = 'approved' ORDER BY created_at DESC LIMIT ?, ?`;
  const [rows] = await db.execute(sql, [offset, limit]);
  return rows;
};
const getAllPhotos = async (limit, offset) => {
  const sql = `SELECT * FROM photos_v2 ORDER BY created_at DESC LIMIT ?, ?`;
  const [rows] = await db.execute(sql, [offset, limit]);
  return rows;
};

const searchPhotos = async (query) => {
  const sql = `SELECT * FROM photos_v2 WHERE caption LIKE ? AND status = 'approved'`;
  const [rows] = await db.execute(sql, [`%${query}%`]);
  return rows;
};
const getPhotoById = async (id) => {
  const sql = `SELECT * FROM photos_v2 WHERE id = ?`;
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
};

const approvePhoto = async (id) => {
  const sql = `UPDATE photos_v2 SET status = 'approved' WHERE id = ? AND status = 'pending'`;
  const [result] = await db.execute(sql, [id]);
  return result;
};
const rejectPhoto = async (id) => {
  const sql = `UPDATE photos_v2 SET status = 'rejected' WHERE id = ? AND status = 'pending'`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

const deletePhoto = async (id) => {
  const sql = `UPDATE photos_v2 SET status = 'deleted' WHERE id = ? AND status = 'pending'`;
  const [result] = await db.execute(sql, [id]);
  return result;
};
module.exports = {
  uploadPhoto,
  getPhotos,
  getAllPhotos,
  searchPhotos,
  getPhotoById,
  deletePhoto,
  approvePhoto,
  rejectPhoto,
};
