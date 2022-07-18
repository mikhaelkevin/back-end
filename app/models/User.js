const db = require('../../configs/database');

const getUsersModel = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (error, result) => {
      if (error) return reject(error);
      resolve(result.rows);
    });
  });
};

module.exports = { getUsersModel };
