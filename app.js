const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');
const messageRoutes = require('./routes/messageRoutes');
const searchRoutes = require('./routes/searchRoutes');
const middleware = require('./utils/middleware');


const app = express();

app.use(cors());

const server = http.createServer(app);
const io =new Server(server, {
  cors: { origin: "*" }
})
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.authMiddleware);
app.use('/uploads', express.static('uploads'));

app.use('/api/v2/users', userRoutes);
app.use('/api/v2/photos', photoRoutes);
app.use('/api/v2/messages', messageRoutes);
app.use('/api/v2/search', searchRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  // 接收来自客户端的消息
  socket.on('updateMessage', (msg) => {
    // 可以将消息广播给所有客户端
    io.emit('updateMessage', 'server:' + msg);
  });

  // 断开连接时的处理
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});