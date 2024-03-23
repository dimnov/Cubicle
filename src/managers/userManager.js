const User = require('../models/User.js');

exports.register = (username, password, repeatPassword) => User.create(username, password, repeatPassword);