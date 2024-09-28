const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql.sqlpub.com',      // 数据库服务器地址
  user: 'wedding',  // 数据库用户名
  password: 'frhFPEkcEk1KhDZt',  // 数据库密码
  database: 'laodiwedding',   // 数据库名
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = pool.promise();