const uniqid = require('uniqid');
const { cubes } = require('../data/cubes.json');

exports.getAll = (search, from, to) => {
  let result = cubes.slice();

  if (search) {
    result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (from) {
    result = result.filter(cube => cube.difficultyLevel >= Number(from));
  }

  if (to) {
    result = result.filter(cube => cube.difficultyLevel <= Number(to));
  }

  return result;
}

exports.getOne = (cubeId) => cubes.find(cube => String(cube.id) === String(cubeId));


exports.create = (cubeData) => {
  cubes.push({
    id: uniqid(),
    ...cubeData,
  });
}