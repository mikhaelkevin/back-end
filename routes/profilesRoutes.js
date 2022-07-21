const profileRoutes = require('express').Router();
const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { getUserExperiences, addUserExperiences, updateUserExperiences, deleteUserExperiences, getUserPortofolios, deleteUserPortofolios } = require('../app/controllers/profilesControllers');

// ROUTE ENDPOINTS
profileRoutes.get('/:id', asyncHandler(getUserExperiences));

profileRoutes.get('/:id/experiences', asyncHandler(getUserExperiences))
  .post('/:id/experiences', urlencoded, asyncHandler(addUserExperiences));

profileRoutes.patch('/:profileId/experiences/:experienceId', urlencoded, asyncHandler(updateUserExperiences))
  .delete('/:profileId/experiences/:experienceId', asyncHandler(deleteUserExperiences));

profileRoutes.get('/:id/portofolios', asyncHandler(getUserPortofolios))
  .delete('/:profileId/portofolios/:portofolioId', asyncHandler(deleteUserPortofolios));

module.exports = profileRoutes;
