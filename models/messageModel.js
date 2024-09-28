const db = require("../db");

const createMessage = async (content) => {
  const sql = `INSERT INTO messages (content) VALUES (?)`;
  const [result] = await db.execute(sql, [content]);
  return result;
};

const getMessages = async () => {
  const sql = `SELECT * FROM messages ORDER BY created_at DESC`;
  const [rows] = await db.execute(sql);
  return rows;
};

const searchMessages = async (query) => {
  const sql = `SELECT * FROM messages WHERE content LIKE ?`;
  const [rows] = await db.execute(sql, [`%${query}%`]);
  return rows;
};

module.exports = {
  createMessage,
  getMessages,
  searchMessages,
};
