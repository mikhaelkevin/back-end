const profileRoutes = require('express').Router();
const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { getUserExperiences, addUserExperiences, updateUserExperiences, deleteUserExperiences } = require('../app/controllers/profilesControllers');

// ROUTE ENDPOINTS
profileRoutes.get('/:id', asyncHandler(getUserExperiences)).get('/:id/experiences', asyncHandler(getUserExperiences))
  .post('/:id/experiences', urlencoded, asyncHandler(addUserExperiences))
  .patch('/:profileId/experiences/:experienceId', urlencoded, asyncHandler(updateUserExperiences))
  .delete('/:profileId/experiences/:experienceId', asyncHandler(deleteUserExperiences));

module.exports = profileRoutes;
