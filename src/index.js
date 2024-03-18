const express = require('express');

const expressConfig = require('./config/express');
const handlebarsConfig = require('./config/handlebars');
const dbConnect = require('./config/dbConfig');

const PORT = require('./config/config');
const routes = require('./routes');

const app = express();

expressConfig(app);
handlebarsConfig(app);

dbConnect()
  .then(() => console.log('DB connected...'))
  .catch((err) => console.log(err));

app.use(routes);

app.listen(PORT, console.log(`Listen on port ${PORT}...`));