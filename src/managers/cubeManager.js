const uniqid = require('uniqid');
const { cubes } = require('../data/cubes.json');

exports.getAll = () => {
  return cubes.slice();
}

exports.create = (cubeData) => {
  cubes.push({
    id: uniqid(),
    ...cubeData,
  });
}