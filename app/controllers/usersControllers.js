const { ErrorResponse } = require('../../utils/errorResponse');
const { getUsersModel } = require('../models/User');

const getUsers = async (req, res) => {
  const getUsersResult = await getUsersModel();
  if (!getUsersResult.length) throw new ErrorResponse('Data is empty!', 500);
  res.status(200).send(getUsersResult);
};

module.exports = { getUsers };
