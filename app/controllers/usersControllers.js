const { ErrorResponse } = require('../../utils/errorResponse');
const { registerRecruiterModel, registerCandidateModel, getUserEmailModel } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
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
      throw new ErrorResponse('Do not leave anything blank', 422);
    }
    const registerRecruiter = await registerRecruiterModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      phonenumber: phonenumber.trim(),
      companyField: companyField.trim(),
      roleId
    });
    if (!registerRecruiter?.rowCount) throw new ErrorResponse('Data failed to add', 400);
    res.status(200).send(registerRecruiter?.rows);
  } else if (roleId === '2') {
    const registerCandidate = await registerCandidateModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      phonenumber: phonenumber.trim(),
      roleId
    });
    if (!registerCandidate?.rowCount) throw new ErrorResponse('Data failed to add', 400);
    res.status(200).send(registerCandidate?.rows);
  } else {
    throw new ErrorResponse('Role id is invalid', 400);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const getUserByEmail = await getUserEmailModel(email);
  if (getUserByEmail?.rowCount === 0) throw new ErrorResponse('user not register', 401);
  if (getUserByEmail) {
    const checkPasswrod = bcrypt.compareSync(
      password,
      getUserByEmail?.rows[0]?.password
    );
    if (!checkPasswrod) throw new ErrorResponse('invalid password', 401);
    if (checkPasswrod) {
      const resultUser = getUserByEmail.rows[0];
      const tokenPayload = { id: resultUser.id, email: resultUser.email, roleId: resultUser.role_id };
      const token = jwt.sign(
        tokenPayload,
        process.env.PRIVATE_KEY,
        { expiresIn: '24h' }
      );
      res.status(200).send({
        token
      });
    }
  }
};

module.exports = { registerUser, loginUser };
