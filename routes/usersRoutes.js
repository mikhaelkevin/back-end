
const usersRoutes = require('express').Router();
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { getCandidates } = require('../app/controllers/searchControllers');

// ROUTE ENDPOINTS
usersRoutes.get('/users', asyncHandler(getCandidates)); // SEARCH CANDIDATES

module.exports = usersRoutes;
