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
module.exports = { editCandidateInformation, editRecruiterInformation };
