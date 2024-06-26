const router = require('express').Router();

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const userController = require('./controllers/userController');

router.use(homeController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);
router.use('/users', userController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;
