const { ErrorResponse } = require('../../utils/errorResponse');
const { registerRecruiterModel, registerCandidateModel, getUserEmailModel } = require('../models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password, phonenumber, roleId, companyField } = req.body;

  const fieldIsBlank = !name || !email || !password || !phonenumber || !roleId;
  if (fieldIsBlank || (!companyField && roleId === '1')) throw new ErrorResponse('Do not leave anything blank', 422);

  const salt = bcrypt.genSaltSync(15);
  const hash = bcrypt.hashSync(password, salt);

  if (roleId === '1') {
    const registerRecruiter = await registerRecruiterModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      phonenumber: phonenumber.trim(),
      companyField: companyField.trim(),
      roleId
    });
    if (!registerRecruiter?.rowCount) throw new ErrorResponse('Data failed to add', 400);

    return res.status(200).send({ message: 'Register as recruiter success!' });
  } else if (roleId === '2') {
    // return res.status(200).send(req.body);
    const registerCandidate = await registerCandidateModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      phonenumber: phonenumber.trim(),
      roleId
    });
    if (!registerCandidate?.rowCount) throw new ErrorResponse('Data failed to add', 400);

    return res.status(200).send({ message: 'Register as candidate success!' });
  } else {
    throw new ErrorResponse('Role id is invalid', 400);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ErrorResponse('Email and password is required!');

  const getUserByEmail = await getUserEmailModel(email);
  if (!getUserByEmail?.rowCount) throw new ErrorResponse('Invalid email', 401);

  const checkPassword = bcrypt.compareSync(password, getUserByEmail?.rows[0]?.password);
  if (!checkPassword) throw new ErrorResponse('Invalid password', 401);

  const resultUser = getUserByEmail.rows[0];
  const tokenPayload = {
    id: resultUser.id,
    email: resultUser.email,
    profilePicture: resultUser.profile_picture,
    coverImage: resultUser.cover_image,
    roleId: resultUser.role_id
  };

  const token = jwt.sign(tokenPayload, process.env.PRIVATE_KEY, { expiresIn: '24h' });
  res.status(200).send({ token });
};

module.exports = { registerUser, loginUser };
