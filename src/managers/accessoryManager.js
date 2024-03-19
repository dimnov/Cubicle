const Accessory = require("../models/Accessory.js");

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getAllExcept = (accessoryIds) => Accessory.find({ _id: { $nin: accessoryIds } });
