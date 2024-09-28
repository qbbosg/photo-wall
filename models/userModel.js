const db = require('../db');

const createUser = async (username, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
  const values = [username, hashedPassword, email];
  await db.execute(sql, values);
};

const findUser = async (username, password) => {
  const sql = `SELECT * FROM users WHERE username = ?`;
  const [rows] = await db.execute(sql, [username]);
  const user = rows[0];
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
};

module.exports = {
  createUser,
  findUser
};