const { ErrorResponse } = require('../../utils/errorResponse');
const db = require('../../configs/database');

const editCandidateInformation = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query(`WITH updateCandidateInformation AS (
            UPDATE candidate_profiles SET name=$1, job=$2, domicile=$3, work_place=$4, 
            description=$5, skills=$6, instagram=$7, github=$8
            WHERE user_id=$9 RETURNING user_id)
            UPDATE users SET profile_picture=$10, cover_image=$11 
            WHERE id in (SELECT user_id FROM updateCandidateInformation)
            RETURNING email`,
    [requestData.newName, requestData.newJob, requestData.newDomicile, requestData.newWorkPlace, requestData.newDescription, requestData.newSkills, requestData.newInstagram, requestData.newGithub, requestData.userId, requestData.newProfilePicture, requestData.newCoverImage],
    (error, result) => {
      if (error) return reject(error);
      if (!result?.rowCount) return reject(new ErrorResponse('Sorry, something wrong while updating information'));
      resolve(result);
    });
  });
};

const getUserExperiencesModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM experiences WHERE candidate_profile_id = $1', [id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const editRecruiterInformation = (requestData) => {
  return new Promise((resolve, reject) => {
    db.query(`WITH updateRecruiterInformation AS (
            UPDATE recruiter_profiles SET company_name=$1, company_field=$2, company_domicile=$3, description=$4, 
            instagram=$5, linkedin=$6
            WHERE user_id=$7 RETURNING user_id)
            UPDATE users SET email=$8, phonenumber=$9, profile_picture=$10, cover_image=$11 
            WHERE id in (SELECT user_id FROM updateRecruiterInformation)
            RETURNING email`,
    [requestData.newCompanyName, requestData.newCompanyField, requestData.newCompanyDomicile, requestData.newDescription, requestData.newInstagram, requestData.newLinkedIn, requestData.userId, requestData.newEmail, requestData.newPhoneNumber, requestData.newProfilePicture, requestData.newCoverImage],
    (error, result) => {
      if (error) return reject(error);
      if (!result?.rowCount) return reject(new ErrorResponse('Sorry, something wrong while updating information'));
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

module.exports = { getUserExperiencesModel, getExperienceById, insertUserExperiences, updateUserExperiencesModel, deleteUserExperienceModel, editCandidateInformation, editRecruiterInformation };
