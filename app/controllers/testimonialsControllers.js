const { getUserById } = require('../models/User');
const { addTestimonialModel, getAllTestimonials } = require('../models/Testimonial');
const { ErrorResponse } = require('../../utils/errorResponse');
const { joinProfileAndUser } = require('./profilesControllers');

const addTestimonial = async (req, res) => {
  const { testimonialMessage, userId } = req.body;

  // FIELD CHECKER
  if (!testimonialMessage) throw new ErrorResponse('Type something to add testimonial');
  await getUserById(userId);

  // TESTIMONIAL CHECKER BY USERID
  const testimonialsData = await getAllTestimonials();
  const testimonialsUserIdChecker = testimonialsData?.rows?.filter(value => value.user_id === Number(userId));
  if (testimonialsUserIdChecker.length) throw new ErrorResponse("Sorry, can't add testimonial more than once", 500);

  // TESTIMONIAL ADD
  await addTestimonialModel({ testimonialMessage, userId });

  res.status(200).send({ message: 'Testimonial added!' });
};

const getTestimonials = async (req, res) => {
  const getAllTestimonialsResults = await getAllTestimonials();

  const testimonialsList = getAllTestimonialsResults?.rows.map(value => ({
    id: value?.id,
    testimonialMessage: value?.testimonial_message,
    userId: value?.user_id
  }));

  await Promise.all(testimonialsList.map(async data => {
    const temp = await joinProfileAndUser(data.userId);
    data.userInfo = { image: temp.profilePicture };
    if (temp.roleId === 1) {
      data.userInfo.name = temp.companyName;
      data.userInfo.subTitle = temp.companyField;
    }

    if (temp.roleId === 2) {
      data.userInfo.name = temp.name;
      data.userInfo.subTitle = temp.job;
    }
  }));

  res.status(200).send(testimonialsList);
};

module.exports = { addTestimonial, getTestimonials };
