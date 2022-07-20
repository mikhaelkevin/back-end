const db = require('../../configs/database');
const { ErrorResponse } = require('../../utils/errorResponse');

const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id=$1',
      [userId],
      (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse('User not found!', 404));
        resolve(result);
      });
  });
};

module.exports = { getUserById };
