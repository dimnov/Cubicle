const { getAll, getOne } = require('../managers/cubeManager.js');

const router = require('express').Router();

router.get('/', (req, res) => {
  const { search, from, to } = req.query;

  const cubes = getAll(search, from, to);

  res.render('index', { cubes });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;