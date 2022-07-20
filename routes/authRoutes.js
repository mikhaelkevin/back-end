
const usersRoutes = require('express').Router();
const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { registerUser, loginUser } = require('../app/controllers/authControllers');

// ROUTE ENDPOINTS
usersRoutes.post('/register', urlencoded, asyncHandler(registerUser)); // USERS REGISTER
usersRoutes.post('/login', urlencoded, asyncHandler(loginUser)); // USERS LOGIN

module.exports = usersRoutes;
