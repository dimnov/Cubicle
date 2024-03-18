const Accessory = require("../models/Accessory.js");

exports.create = async (accessoryData) => {
  const accessory = new Accessory(accessoryData);
  await accessory.save();
  return accessory;
}