const hiresRoutes = require('express').Router();
// const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { getProfile, editProfile } = require('../app/controllers/profilesControllers');
const { multerFields } = require('../app/middlewares/multerHandler');

// ROUTE ENDPOINTS
hiresRoutes.get('/:userId', asyncHandler(getProfile))
  .patch('/:userId', multerFields, asyncHandler(editProfile));

module.exports = hiresRoutes;
