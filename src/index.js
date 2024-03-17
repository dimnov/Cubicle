const express = require('express');
const app = express();
const expressConfig = require('./config/express');
const handlebarsConfig = require('./config/handlebars');
const PORT = require('./config/config');

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');

expressConfig(app);
handlebarsConfig(app);

app.use(homeController);
app.use('/cubes', cubeController);

app.listen(PORT, console.log(`Listen on port ${PORT}...`));