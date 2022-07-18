const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// CONFIG
const app = express();
const port = 8000;

// MIDDLEWARES
const { errorHandler } = require('./app/middlewares/errorHandler');
const corsWithAllowList = require('./configs/cors');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES DECLARATION
const usersRoutes = require('./routes/usersRoutes');

// ROUTES
app.use('/binary/', corsWithAllowList, usersRoutes);

app.use(errorHandler);

// APP RUN
app.listen(port, () => {
  console.log('Running on port', port);
});
