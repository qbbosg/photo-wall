const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await User.createUser(username, password, email);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findUser(username, password);
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Username or password incorrect');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};