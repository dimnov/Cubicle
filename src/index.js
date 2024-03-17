const express = require('express');
const handlebars = require('express-handlebars');

const PORT = require('./config/config');

const app = express();

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, console.log(`Listen on port ${PORT}...`));