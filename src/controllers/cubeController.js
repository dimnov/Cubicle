const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const getDifficultyOptions = require('../helpers/difficultyOptions');

router.get('/create', isAuth, (req, res) => {
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

  if (!cubeData) {
    return res.redirect('/404');
  }

  const isOwner = cubeData.owner?.toString() === req.user?._id;

  res.render('cubes/details', { cubeData, isOwner });
});

router.get('/:cubeId/accessory', isAuth, async (req, res) => {
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

router.get('/:cubeId/delete', isAuth, async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  const options = getDifficultyOptions(cube.difficultyLevel);

  res.render('cubes/delete', { cube, options });
});

router.post('/:cubeId/delete', async (req, res) => {
  await cubeManager.delete(req.params.cubeId);

  res.redirect('/');
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  const options = getDifficultyOptions(cube.difficultyLevel);

  console.log(options)
  res.render('cubes/edit', { cube, options });
});

router.post('/:cubeId/edit', async (req, res) => {
  const cubeId = req.params.cubeId;
  const cubeData = req.body;
  await cubeManager.update(cubeId, cubeData);

  res.redirect(`/cubes/details/${cubeId}`);
});

module.exports = router;