const bcrypt = require('bcrypt');
const User = require('../models/User.js');

exports.register = (username, password, repeatPassword) => User.create(username, password, repeatPassword);

exports.login = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Cannot find username or password');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Cannot find username or password');
  }

  return user;
}