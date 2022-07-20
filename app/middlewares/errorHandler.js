const errorHandler = (error, req, res, next) => {
  console.log('Error =>', error);
  if (error.code === '23505') {
    error.message = 'Data has been used';
  }
  res.status(error.status || 500).send({
    message: error.message || 'Internal server error'
  });
};

module.exports = { errorHandler };
