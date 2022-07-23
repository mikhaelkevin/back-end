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
const { authorizationTokenHandler } = require('./app/middlewares/tokenHandler');
app.use(helmet());
app.use(bodyParser.json());

// ROUTES DECLARATION
const usersRoutes = require('./routes/usersRoutes');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const authRoutes = require('./routes/authRoutes');
const profilesRoutes = require('./routes/profilesRoutes');

// PUBLIC ROUTES
app.use('/auth', corsWithAllowList, authRoutes);
app.use('/testimonials', corsWithAllowList, testimonialsRoutes);

// PRIVATE ROUTES JWT REQUIRED
app.use('/', corsWithAllowList, authorizationTokenHandler, usersRoutes);
app.use('/profile', corsWithAllowList, authorizationTokenHandler, profilesRoutes);

app.use(errorHandler);

// APP RUN
app.listen(port, () => {
  console.log('Running on port', port);
});
