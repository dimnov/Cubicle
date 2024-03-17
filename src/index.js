const express = require('express');
const app = express();

const expressConfig = require('./config/express.js');
const handlebarsConfig = require('./config/handlebars.js');

const PORT = require('./config/config');

expressConfig(app);
handlebarsConfig(app);



app.listen(PORT, console.log(`Listen on port ${PORT}...`));