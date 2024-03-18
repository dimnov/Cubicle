const router = require('express').Router();
const cubeManager = require('../managers/cubeManager.js');
const accessoryManager = require('../managers/accessoryManager.js');

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

router.get('/details/:id', async (req, res) => {
  const cubeData = await cubeManager.getOne(req.params.id).lean();
  res.render('details', { cubeData });
});

router.get('/:id/accessory', async (req, res) => {
  const cube = await cubeManager.getOne(req.params.id).lean();
  const accessories = await accessoryManager.getAll().lean();

  res.render('accessory/attach', { cube, accessories });
});

module.exports = router;