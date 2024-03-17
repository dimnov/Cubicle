const uniqid = require('uniqid');
const { cubes } = require('../data/cubes.json');

exports.getAll = () => {
  return cubes.slice();
}

exports.getOne = (cubeId) => {
  const cubeIndex = cubes.indexOf(cube => String(cube.id) === String(cubeId));
  return cubes.slice(cubeIndex, 1);
}

exports.create = (cubeData) => {
  cubes.push({
    id: uniqid(),
    ...cubeData,
  });
}