const profileRoutes = require('express').Router();
const asyncHandler = require('../app/middlewares/asyncHandler');
const urlencoded = require('body-parser').urlencoded({ extended: false });

// CONTROLLER DECLARATIONS
const { getProfile, editProfile, getUserExperiences, addUserExperiences, updateUserExperiences, deleteUserExperiences } = require('../app/controllers/profilesControllers');
const { multerFields } = require('../app/middlewares/multerHandler');

// ROUTE ENDPOINTS
profileRoutes.get('/:id/experiences', asyncHandler(getUserExperiences))
  .post('/:id/experiences', urlencoded, asyncHandler(addUserExperiences))
  .patch('/:profileId/experiences/:experienceId', urlencoded, asyncHandler(updateUserExperiences))
  .delete('/:profileId/experiences/:experienceId', asyncHandler(deleteUserExperiences));

profileRoutes.get('/:userId', asyncHandler(getProfile))
  .patch('/:userId', multerFields, asyncHandler(editProfile));

module.exports = profileRoutes;
