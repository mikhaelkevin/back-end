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

const getRecruiterById = (recruiterId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recruiter_profiles WHERE id = $1',
      [recruiterId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

const getCandidateById = (candidateId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM candidate_profiles WHERE id = $1',
      [candidateId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

const getCandidateByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM candidate_profiles WHERE user_id = $1',
      [userId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

const getRecruiterByUserId = (recruiterId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recruiter_profiles WHERE user_id = $1',
      [recruiterId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

module.exports = {
  getUserEmailModel,
  getUserById,
  getRecruiterById,
  getCandidateById,
  getCandidateByUserId,
  getRecruiterByUserId
};
