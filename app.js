/* eslint-disable quotes */
// eslint-disable-next-line quotes
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// CONFIG
const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT;

// MIDDLEWARES
const { errorHandler } = require('./app/middlewares/errorHandler');
const { authorizationTokenHandler } = require('./app/middlewares/tokenHandler');

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.json());
app.use(cors());

// CORS CONFIGURATION
// const allowlist = ['https://joshy-app.web.app/', 'http://localhost:3001', 'http://localhost:3000'];
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

// ROUTES DECLARATION
const usersRoutes = require('./routes/usersRoutes');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const authRoutes = require('./routes/authRoutes');
const profilesRoutes = require('./routes/profilesRoutes');

// PUBLIC ROUTES
app.use('/auth', authRoutes);
app.use('/testimonials', testimonialsRoutes);

// PRIVATE ROUTES JWT REQUIRED
app.use('/', authorizationTokenHandler, usersRoutes);
app.use('/profile', authorizationTokenHandler, profilesRoutes);

app.use('*', (req, res) => {
  res.status(200).send('Connected');
});

app.use(errorHandler);

// APP RUN
app.listen(port, () => {
  console.log('Running on port', port);
});
