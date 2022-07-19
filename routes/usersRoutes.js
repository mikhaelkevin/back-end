
const usersRoutes = require('express').Router();
const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { registerUser } = require('../app/controllers/usersControllers');

// ROUTE ENDPOINTS
// usersRoutes.get('/', urlencoded, asyncHandler(getUsers));
usersRoutes.post('/register', urlencoded, asyncHandler(registerUser));

module.exports = usersRoutes;
