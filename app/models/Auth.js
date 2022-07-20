const db = require('../../configs/database');

const registerRecruiterModel = (person) => {
  return new Promise((resolve, reject) => {
    db.query(`WITH insertIntoUsers AS (INSERT INTO users(email, password, role_id, phonenumber) 
    VALUES ($1, $2, $3, $4) RETURNING id)
    INSERT INTO recruiter_profiles(company_name, company_field, user_id)
    SELECT $5, $6, id FROM insertIntoUsers RETURNING user_id`,
    [person.email, person.password, person.roleId, person.phonenumber, person.name, person.companyField],
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const registerCandidateModel = (person) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (email, password, role_id, phonenumber) VALUES ($1, $2, $3, $4) RETURNING *',
      [person.email, person.password, person.roleId, person.phonenumber], (error, result) => {
        if (error) {
          reject(error);
        } else {
          const userId = result.rows[0].id;
          db.query('INSERT INTO candidate_profiles (name ,user_id) VALUES ($1, $2) RETURNING name',
            [person.name, userId], (_error, _result) => {
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
module.exports = { registerRecruiterModel, registerCandidateModel, getUserEmailModel };
