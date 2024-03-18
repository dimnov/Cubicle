const Accessory = require("../models/Accessory.js");

exports.getAll = () => Accessory.find();

exports.create = (accessoryData) => Accessory.create(accessoryData);