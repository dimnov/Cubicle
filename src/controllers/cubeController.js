const cubeManager = require('../managers/cubeManager.js');
const router = require('express').Router();

router.get('/create', (req, res) => {
  console.log(cubeManager.getAll());
  res.render('create');
});

router.get('/details/:id', (req, res) => {
  const cubeId = req.params.id;
  const cubeData = cubeManager.getOne(cubeId);

  res.render('details', { cubeData });
});

router.post('/create', (req, res) => {
  const {
    name,
    description,
    imageUrl,
    difficultyLevel,
  } = req.body;

  cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect('/');
});

module.exports = router;