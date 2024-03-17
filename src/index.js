const express = require('express');

const expressConfig = require('./config/express');
const handlebarsConfig = require('./config/handlebars');
const PORT = require('./config/config');
const routes = require('./routes');

const app = express();

expressConfig(app);
handlebarsConfig(app);

app.use(routes);

app.listen(PORT, console.log(`Listen on port ${PORT}...`));