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

// router.get('*', (req, res, next) => {
//   res.render('404');
// });

module.exports = router;