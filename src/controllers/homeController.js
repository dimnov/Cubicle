const { getAll, getOne } = require('../managers/cubeManager.js');

const router = require('express').Router();

router.get('/', (req, res) => {
  const cubes = getAll();
  console.log(cubes)
  res.render('index', { cubes });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;