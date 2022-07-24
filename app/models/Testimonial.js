const db = require('../../configs/database');
const { ErrorResponse } = require('../../utils/errorResponse');

const addTestimonialModel = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO testimonials(testimonial_message, user_id) values($1,$2) RETURNING user_id',
      [requestData.testimonialMessage, requestData.userId],
      (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse('Something wrong on adding testimonial'));
        resolve(result);
      });
  });
};

const getAllTestimonials = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM testimonials',
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

module.exports = { addTestimonialModel, getAllTestimonials };
