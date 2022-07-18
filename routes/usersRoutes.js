
const usersRoutes = require('express').Router();
const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { getUsers } = require('../app/controllers/usersControllers');

// ROUTE ENDPOINTS
usersRoutes.get('/', urlencoded, asyncHandler(getUsers));

module.exports = usersRoutes;
