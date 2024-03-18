const { getAll } = require('../managers/cubeManager.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const { search, from, to } = req.query;
  const cubes = await getAll(search, from, to);

  res.render('index', { cubes, search, from, to });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;