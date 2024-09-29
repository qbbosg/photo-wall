const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const config = require('./config');
const middleware = require('./middleware');
const routes = require('./routes');
const socketHandler = require('./socketHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.authMiddleware);
app.use(middleware.uploadMiddleware.single('file'));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// 使用路由
app.use('/api/v2', routes);

// 设置 Socket.IO
socketHandler(io);

server.listen(config.PORT, () => {
  console.log(`服务器运行在端口 ${config.PORT}`);
});