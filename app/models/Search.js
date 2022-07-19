const db = require('../../configs/database');
const { ErrorResponse } = require('../../utils/errorResponse');

// START OF GET ALL USERS WITH QPARAMS
const getAllCandidates = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM candidate_profiles',
      (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse('Sorry, candidates is not found.', 404));
        resolve(result);
      });
  });
};

const getCandidateByDomicile = (domicileValue) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM candidate_profiles WHERE LOWER(domicile) LIKE LOWER($1) ORDER BY domicile ASC',
      [`%${domicileValue}%`],
      (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse(`Sorry, candidates with ${domicileValue} domicile is not found.`, 404));
        resolve(result);
      });
  });
};

const getCandidateBySkills = (skillValue) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM candidate_profiles WHERE LOWER(skills) LIKE LOWER($1) ORDER BY skills ASC',
      [`%${skillValue}%`],
      (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse(`Sorry, candidates with ${skillValue} skill is not found.`, 404));
        resolve(result);
      });
  });
};

const getCandidateByName = (nameValue) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM candidate_profiles WHERE LOWER(name) LIKE LOWER($1) ORDER BY name ASC',
      [`%${nameValue}%`],
      (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse(`Sorry, candidates named ${nameValue} is not found`, 404));
        resolve(result);
      });
  });
};
// END OF GET ALL USERS WITH QPARAMS

module.exports = { getCandidateByDomicile, getCandidateBySkills, getCandidateByName, getAllCandidates };
