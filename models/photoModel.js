const db = require("../db");

const uploadPhoto = async (caption, photoPath) => {
  const sql = `INSERT INTO photos (caption, photo_path) VALUES (?, ?)`;
  const [result] = await db.execute(sql, [caption, photoPath]);
  return result;
};

const getPhotos = async () => {
  const sql = `SELECT * FROM photos ORDER BY created_at DESC`;
  const [rows] = await db.execute(sql);
  return rows;
};

const searchPhotos = async (query) => {
  const sql = `SELECT * FROM photos WHERE caption LIKE ?`;
  const [rows] = await db.execute(sql, [`%${query}%`]);
  return rows;
};

module.exports = {
  uploadPhoto,
  getPhotos,
  searchPhotos,
};
