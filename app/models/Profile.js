const db = require('../../configs/database');
const { ErrorResponse } = require('../../utils/errorResponse');

const getUserExperiencesModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM experiences WHERE candidate_profile_id = $1', [id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const getExperienceById = (experienceId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM experiences WHERE id = $1',
      [experienceId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

const insertUserExperiences = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO experiences (position, company_name, start_date, end_date, description, candidate_profile_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [requestData.position, requestData.companyName, requestData.startDate, requestData.endDate, requestData.description, requestData.id],
      (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse('Something wrong on adding experience'));
        resolve(result);
      });
  });
};

const updateUserExperiencesModel = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE experiences SET position = $1, company_name = $2, start_date = $3, end_date = $4, description = $5, candidate_profile_id = $6 WHERE id = $7',
      [requestData.position, requestData.companyName, requestData.startDate, requestData.endDate, requestData.description, requestData.profileId, requestData.experienceId], (error, result) => {
        if (error) return reject(error);
        if (!result.rowCount) return reject(new ErrorResponse('Something wrong on update experience'));
        resolve(result);
      }
    );
  });
};

const deleteUserExperienceModel = (experienceId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM experiences WHERE id = $1', [experienceId], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const getUserPortofoliosModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM portofolios WHERE candidate_profile_id = $1', [id],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

const deleteUserPortofolioModel = (portofolioId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM portofolios WHERE id = $1', [portofolioId], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const getPortofolioById = (portofolioId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM portofolios WHERE id = $1',
      [portofolioId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
  });
};

module.exports = {
  getUserExperiencesModel,
  getExperienceById,
  insertUserExperiences,
  updateUserExperiencesModel,
  deleteUserExperienceModel,
  getUserPortofoliosModel,
  getPortofolioById,
  deleteUserPortofolioModel
};
