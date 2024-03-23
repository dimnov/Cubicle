const router = require('express').Router();
const cubeManager = require('../managers/cubeManager.js');
const accessoryManager = require('../managers/accessoryManager.js');

router.get('/create', (req, res) => {
  res.render('cubes/create');
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
    owner: req.user._id,
  });
  res.redirect('/');
});

router.get('/details/:cubeId', async (req, res) => {
  const cubeData = await cubeManager.getOne(req.params.cubeId).lean();

  res.render('cubes/details', { cubeData });
});

router.get('/:cubeId/accessory', async (req, res) => {
  const cubeData = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager.getAllExcept(cubeData.accessories).lean();

  const hasAccessories = accessories.length > 0;

  res.render('accessories/attach', { cubeData, accessories, hasAccessories });
});

router.post('/:cubeId/accessory', async (req, res) => {
  const cubeId = req.params.cubeId;
  const { accessory: accessoryId } = req.body;

  await cubeManager.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/:cubeId/delete', async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  res.render('cubes/delete', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
  await cubeManager.delete(req.params.cubeId);

  res.redirect('/');
});

router.get('/:cubeId/edit', async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  res.render('cubes/edit', { cube });
});

router.post('/:cubeId/edit', async (req, res) => {
  const cubeId = req.params.cubeId;
  const cubeData = req.body;
  await cubeManager.update(cubeId, cubeData);

  res.redirect(`/cubes/details/${cubeId}`);
});

module.exports = router;