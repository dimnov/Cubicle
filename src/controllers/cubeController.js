const router = require('express').Router();
const { cubes } = require('../config/database.json');

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res) => {
  const cube = {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    difficultyLevel: req.body.difficultyLevel,
  }

  console.log(cube)
  res.redirect('/');
});

module.exports = router;