const uniqid = require('uniqid');
const cubes = [];

exports.getAll = () => {
  return cubes.slice();
}

exports.create = (cubeData) => {
  cubes.push({
    id: uniqid(),
    ...cubeData,
  });
}