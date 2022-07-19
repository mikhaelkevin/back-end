
const testimonialsRoutes = require('express').Router();
const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { addTestimonial, getTestimonials } = require('../app/controllers/testimonialsControllers');

// ROUTE ENDPOINTS
testimonialsRoutes.post('/', urlencoded, asyncHandler(addTestimonial))
  .get('/', asyncHandler(getTestimonials));

module.exports = testimonialsRoutes;
