const express = require('express');
const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');
const messageRoutes = require('./routes/messageRoutes');
const searchRoutes = require('./routes/searchRoutes');
const middleware = require('./utils/middleware');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.authMiddleware);
app.use('/uploads', express.static('uploads'));

app.use('/api/v2/users', userRoutes);
app.use('/api/v2/photos', photoRoutes);
app.use('/api/v2/messages', messageRoutes);
app.use('/api/v2/search', searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});