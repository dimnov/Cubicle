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

router.get('/details/:cubeId', async (req, res) => {
  const cubeData = await cubeManager.getOne(req.params.cubeId).lean();

  res.render('details', { cubeData });
});

router.get('/:cubeId/accessory', async (req, res) => {
  const cubeData = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager.getAll().lean();

  const hasAccessories = accessories.length > 0;

  res.render('accessory/attach', { cubeData, accessories, hasAccessories });
});

router.post('/:cubeId/accessory', async (req, res) => {
  const cubeId = req.params.cubeId;
  const { accessory: accessoryId } = req.body;

  await cubeManager.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/details/${cubeId}`);
});

module.exports = router;