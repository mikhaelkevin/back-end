const { getUserExperiencesModel, getExperienceById, insertUserExperiences, updateUserExperiencesModel, deleteUserExperienceModel, getUserPortofoliosModel, getPortofolioById, deleteUserPortofolioModel } = require('../models/Profile');
const { getCandidateById } = require('../models/User');
const { ErrorResponse } = require('../../utils/errorResponse');

const getUserExperiences = async (req, res) => {
  const { id } = req.params;
  const candidateChecker = await getCandidateById(id);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');
  const getAllUserExperiences = await getUserExperiencesModel(id);
  res.status(200).send(getAllUserExperiences.rows);
};

const addUserExperiences = async (req, res) => {
  const { id } = req.params;
  const candidateChecker = await getCandidateById(id);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');

  const { position, companyName, startDate, endDate, description } = req.body;
  await insertUserExperiences({ position, companyName, startDate, endDate, description, id });
  res.status(200).send({ message: 'experience has been added' });
};

const updateUserExperiences = async (req, res) => {
  const { profileId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');

  const { experienceId } = req.params;
  const experienceIdChecker = await getExperienceById(experienceId);
  if (!experienceIdChecker?.rowCount) throw new ErrorResponse('ExperienceId not found');

  const { position, companyName, startDate, endDate, description } = req.body;
  const getExperience = await getExperienceById(experienceId);

  if (getExperience?.rowCount > 0) {
    const inputPosition = position || getExperience?.rows[0]?.position;
    const inputCompanyName = companyName || getExperience?.rows[0]?.company_name;
    const inputStartDate = startDate || getExperience?.rows[0]?.start_date;
    const inputEndDate = endDate || getExperience?.rows[0]?.end_date;
    const inputDescription = description || getExperience?.rows[0]?.description;

    await updateUserExperiencesModel({
      position: inputPosition,
      companyName: inputCompanyName,
      startDate: inputStartDate,
      endDate: inputEndDate,
      description: inputDescription,
      profileId,
      experienceId
    });
    res.status(200).send({ message: 'experience has been updated' });
  }
};

const deleteUserExperiences = async (req, res) => {
  const { profileId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('CandidateId not found');

  const { experienceId } = req.params;
  const experienceIdChecker = await getExperienceById(experienceId);
  if (!experienceIdChecker?.rowCount) throw new ErrorResponse('ExperienceId not found');

  await deleteUserExperienceModel(experienceId);
  res.status(200).send({ message: 'experience has been deleted' });
};

const getUserPortofolios = async (req, res) => {
  const { id } = req.params;
  const candidateChecker = await getCandidateById(id);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');
  const getAllUserPortofolios = await getUserPortofoliosModel(id);
  res.status(200).send(getAllUserPortofolios.rows);
};

const deleteUserPortofolios = async (req, res) => {
  const { profileId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('CandidateId not found');

  const { portofolioId } = req.params;
  const portofolioIdChecker = await getPortofolioById(portofolioId);
  if (!portofolioIdChecker?.rowCount) throw new ErrorResponse('PortofolioId not found');

  await deleteUserPortofolioModel(portofolioId);
  res.status(200).send({ message: 'experience has been deleted' });
};
module.exports = {
  getUserExperiences,
  addUserExperiences,
  updateUserExperiences,
  deleteUserExperiences,
  getUserPortofolios,
  deleteUserPortofolios
};
