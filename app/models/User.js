const db = require('../../configs/database');

const getUsersModel = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (error, result) => {
      if (error) return reject(error);
      resolve(result.rows);
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
module.exports = { getUsersModel, registerRecruiterModel, registerCandidateModel };
