const router = require('express').Router();

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', (req, res) => {
  const { username, password, repeatPassword } = req.body;

  res.redirect('/users/login');
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', (req, res) => {
  res.redirect('/');
});

module.exports = router;