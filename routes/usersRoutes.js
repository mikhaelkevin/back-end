
const usersRoutes = require('express').Router();
// const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { getCandidates } = require('../app/controllers/searchControllers');

// ROUTE ENDPOINTS
usersRoutes.get('/users', asyncHandler(getCandidates));

module.exports = usersRoutes;
