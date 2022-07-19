const errorHandler = (error, req, res, next) => {
  console.log('Error =>', error);
  res.status(error.status || 500).send({
    message: error.message || 'Internal server error'
  });
};

module.exports = { errorHandler };
