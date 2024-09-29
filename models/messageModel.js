const db = require("../db");

const createMessage = async (content) => {
  const sql = `INSERT INTO messages_v2 (content) VALUES (?)`;
  const [result] = await db.execute(sql, [content]);
  return result;
};

const getMessages = async (limit, offset) => {
  const sql = `SELECT * FROM messages_v2 WHERE status = 'approved' ORDER BY created_at DESC LIMIT ?, ?`;
  const [rows] = await db.execute(sql, [offset, limit]);
  return rows;
};
const getAllMessages = async (limit, offset) => {
  const sql = `SELECT * FROM messages_v2 ORDER BY created_at DESC LIMIT ?, ?`;
  const [rows] = await db.execute(sql, [offset, limit]);
  return rows;
};
const getAllPendingMessages = async (limit, offset) => {
  const sql = `SELECT * FROM messages_v2 WHERE status = 'pending' ORDER BY created_at DESC LIMIT ?, ?`;
  const [rows] = await db.execute(sql, [offset, limit]);
  return rows;
};
const approvedMessage = async (id) => {
  const sql = `UPDATE messages_v2 SET status = 'approved' WHERE id = ? AND status = 'pending'`;
  const [result] = await db.execute(sql, [id]);
  return result;
};
const rejectMessage = async (id) => {
  const sql = `UPDATE messages_v2 SET status = 'rejected' WHERE id = ? AND status = 'pending'`;
  const [result] = await db.execute(sql, [id]);
  return result;
};
const deleteMessage = async (id) => {
  const sql = `UPDATE messages_v2 SET status = 'deleted' WHERE id = ? AND status = 'pending'`;
  const [result] = await db.execute(sql, [id]);
  return result;
};
const searchMessages = async (query, limit, offset) => {
  const sql = `SELECT * FROM messages_v2 WHERE content LIKE ? AND status = 'approved' LIMIT ?, ?`;
  const [rows] = await db.execute(sql, [`%${query}%`, offset, limit]);
  return rows;
};

module.exports = {
  createMessage,
  getMessages,
  getAllMessages,
  getAllPendingMessages,
  searchMessages,
  approvedMessage,
  rejectMessage,
  deleteMessage,
};
