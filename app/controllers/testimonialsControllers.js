const { getUserById } = require('../models/User');
const { addTestimonialModel, getAllTestimonials } = require('../models/Testimonial');
const { ErrorResponse } = require('../../utils/errorResponse');

const addTestimonial = async (req, res) => {
  const { testimonialMessage, userId } = req.body;

  // USERID CHECKER
  await getUserById(userId);

  // TESTIMONIAL CHECKER BY USERID
  const testimonialsData = await getAllTestimonials();
  const testimonialsUserIdChecker = testimonialsData?.rows?.filter(value => value.user_id === Number(userId));
  if (testimonialsUserIdChecker.length) throw new ErrorResponse("Sorry, can't add testimonial more than once", 500);

  // TESTIMONIAL ADD
  await addTestimonialModel({ testimonialMessage, userId });

  res.status(200).send('Testimonial added!');
};

const getTestimonials = async (req, res) => {
  const getAllTestimonialsResults = await getAllTestimonials();

  res.status(200).send(getAllTestimonialsResults.rows);
};

module.exports = { addTestimonial, getTestimonials };
