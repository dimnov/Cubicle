const Cube = require('../models/Cube.js');

exports.getAll = (search, from, to) => {
  let result = Cube.find().lean();

  if (search) {
    result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (from) {
    result = result.filter(cube => Number(cube.difficultyLevel) >= Number(from));
  }

  if (to) {
    result = result.filter(cube => Number(cube.difficultyLevel) <= Number(to));
  }

  return result;
}

exports.getOne = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.create = (cubeData) => Cube.create(cubeData);

exports.attachAccessory = (cubeId, accessoryId) =>
  Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } });