const errorHandler = (error, req, res, next) => {
  console.log('Error =>', error);

  const errorList = {
    duplicateEmail: error?.code === '23505' && error?.constraint === 'users_email_key',
    duplicatePhonenumber: error?.code === '23505' && error?.constraint === 'users_phonenumber_key',
    duplicateCompanyName: error?.code === '23505' && error?.constraint === 'recruiter_profile_company_name_key',
    overLimitInput: error?.code === '22001'
  };

  if (errorList?.duplicateEmail) {
    error.message = 'E-mail has been used';
  }

  if (errorList?.duplicatePhonenumber) {
    error.message = 'Phonenumber has been used';
  }

  if (errorList.duplicateCompanyName) {
    error.message = 'Company name has been used';
  }

  if (errorList.overLimitInput) {
    error.message = 'Input is over limit!';
  }

  res.status(error.status || 500).send({
    message: error.message || 'Internal server error'
  });
};

module.exports = { errorHandler };
