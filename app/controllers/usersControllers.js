const { ErrorResponse } = require('../../utils/errorResponse');
const { registerRecruiterModel, registerCandidateModel } = require('../models/User');
const bcrypt = require('bcrypt');

// const getUsers = async (req, res) => {
//   const getUsersResult = await getUsersModel();
//   if (!getUsersResult.length) throw new ErrorResponse('Data is empty!', 500);
//   res.status(200).send(getUsersResult);
// };

const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password, phonenumber, roleId } = req.body;
  const fieldIsBlank = !name || !email || !password || !phonenumber || !roleId;
  if (fieldIsBlank) {
    throw new ErrorResponse('do not leave anything blank', 422);
  }
  const salt = bcrypt.genSaltSync(15);
  const hash = bcrypt.hashSync(password, salt);

  if (roleId === '1') {
    const { companyField } = req.body;
    if (!companyField) {
      throw new ErrorResponse('do not leave anything blank', 422);
    }
    const registerRecruiter = await registerRecruiterModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      phonenumber: phonenumber.trim(),
      companyField: companyField.trim(),
      roleId
    });
    if (!registerRecruiter?.rowCount) throw new ErrorResponse('data failed to add', 400);
    res.status(200).send(registerRecruiter?.rows);
  } else if (roleId === '2') {
    const registerCandidate = await registerCandidateModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      phonenumber: phonenumber.trim(),
      roleId
    });
    if (!registerCandidate?.rowCount) throw new ErrorResponse('data failed to add', 400);
    res.status(200).send(registerCandidate?.rows);
  } else {
    throw new ErrorResponse('Roles id is invalid', 400);
  }
};

module.exports = { registerUser };
