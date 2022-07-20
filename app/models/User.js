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

const registerRecruiterModel = (person) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *',
      [person.email, person.password, person.roleId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          const userId = result.rows[0].id;
          db.query('INSERT INTO recruiter_profiles (company_name, company_field, phonenumber, user_id) VALUES ($1, $2, $3, $4) RETURNING company_name',
            [person.name, person.companyField, person.phonenumber, userId], (_error, _result) => {
              if (_error) {
                reject(_error);
              } else {
                resolve(_result);
              }
            });
        }
      });
  });
};

const registerCandidateModel = (person) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *',
      [person.email, person.password, person.roleId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          const userId = result.rows[0].id;
          db.query('INSERT INTO candidate_profiles (name, phonenumber, user_id) VALUES ($1, $2, $3) RETURNING name',
            [person.name, person.phonenumber, userId], (_error, _result) => {
              if (_error) {
                reject(_error);
              } else {
                resolve(_result);
              }
            });
        }
      });
  });
};

const getUserEmailModel = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = { registerRecruiterModel, registerCandidateModel, getUserEmailModel, getUserById };
