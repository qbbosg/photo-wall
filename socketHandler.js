module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('新客户端连接');
  
      socket.on('updateMessage', (msg) => {
        io.emit('updateMessage', 'server:' + msg);
      });
  
      socket.on('disconnect', () => {
        console.log('客户端断开连接');
      });
    });
  };