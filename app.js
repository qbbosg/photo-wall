const express = require('express');
const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');
const messageRoutes = require('./routes/messageRoutes');
const middleware = require('./utils/middleware');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  

const app = express();

app.use(express.json());
app.use(middleware.authMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});