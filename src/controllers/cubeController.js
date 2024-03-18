const cubeManager = require('../managers/cubeManager.js');
const router = require('express').Router();

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    difficultyLevel,
  } = req.body;

  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect('/');
});

router.get('/details/:id', (req, res) => {
  const cubeData = cubeManager.getOne(req.params.id);
  res.render('details', { cubeData });
});

module.exports = router;