/* eslint-disable quotes */
// eslint-disable-next-line quotes
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

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
const testimonialsRoutes = require('./routes/testimonialsRoutes');
<<<<<<< HEAD
const authRoutes = require('./routes/authRoutes');
=======
const hiresRoutes = require('./routes/hiresRoutes');
>>>>>>> 402b94abaf4960f1b9aea0d23ebd1ffcebed5b94

// ROUTES
app.use('/', corsWithAllowList, usersRoutes);
app.use('/testimonials', corsWithAllowList, testimonialsRoutes);
<<<<<<< HEAD
app.use('/auth', corsWithAllowList, authRoutes);
=======
app.use('/hires', corsWithAllowList, hiresRoutes);
app.use('/auth', corsWithAllowList, usersRoutes);
>>>>>>> 402b94abaf4960f1b9aea0d23ebd1ffcebed5b94

app.use(errorHandler);

// APP RUN
app.listen(port, () => {
  console.log('Running on port', port);
});
