const db = require('../../configs/database');
const { ErrorResponse } = require('../../utils/errorResponse');

const getAllHires = (profileId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hire_messages where candidate_profiles_id=$1',
      [profileId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

const getDetailHire = (profileId, hireId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hire_messages WHERE candidate_profiles_id=$1 AND id = $2',
      [profileId, hireId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

const insertHireMassage = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO hire_messages (recruiter_profiles_id, candidate_profiles_id, message_subject, description) VALUES ($1, $2, $3, $4) RETURNING id',
      [requestData.recruiterId, requestData.candidateId, requestData.messageSubject, requestData.description],
      (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse('Something wrong on adding hire message'));
        resolve(result);
      });
  });
};

module.exports = { getAllHires, getDetailHire, insertHireMassage };
