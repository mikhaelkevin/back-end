const { ErrorResponse } = require('../../utils/errorResponse');
const {
  getUserById,
  getCandidateByUserId,
  getRecruiterByUserId,
  getCandidateById
} = require('../models/User');
const {
  editCandidateInformation,
  editRecruiterInformation,
  getUserExperiencesModel,
  getExperienceById,
  insertUserExperiences,
  updateUserExperiencesModel,
  deleteUserExperienceModel,
  getUserPortofoliosModel,
  getPortofolioById,
  addUserPortofolioModel,
  editUserPortofolioModel,
  deleteUserPortofolioModel
} = require('../models/Profile');

const getProfile = async (req, res) => {
  const { userId } = req.params;
  const userCompleteData = await joinProfileAndUser(userId);
  res.status(200).send(userCompleteData);
};

const editProfile = async (req, res) => {
  const { userId } = req.params;
  const userCompleteData = await joinProfileAndUser(userId);

  const profilePicture = req?.files?.profilePicture?.[0]?.path;
  const coverImage = req?.files?.coverImage?.[0]?.path;

  const isRecruiter = userCompleteData?.roleId === 1;
  const isCandidate = userCompleteData?.roleId === 2;

  if (isRecruiter) {
    const { companyName, companyField, companyDomicile, description, email, phoneNumber, instagram, linkedin } = req.body;

    const newCompanyName = companyName || userCompleteData?.company_name;
    const newCompanyField = companyField || userCompleteData?.company_field;
    const newCompanyDomicile = companyDomicile || userCompleteData?.company_domicile;
    const newDescription = description || userCompleteData?.description;
    const newEmail = email || userCompleteData?.email;
    const newPhoneNumber = phoneNumber || userCompleteData?.phoneNumber;
    const newProfilePicture = profilePicture || userCompleteData?.profilePicture;
    const newCoverImage = coverImage || userCompleteData?.coverImage;
    const newInstagram = instagram || userCompleteData?.instagram;
    const newLinkedIn = linkedin || userCompleteData?.linkedin;

    const requestData = {
      newCompanyName,
      newCompanyField,
      newCompanyDomicile,
      newDescription,
      newEmail,
      newPhoneNumber,
      newProfilePicture,
      newCoverImage,
      newInstagram,
      newLinkedIn,
      userId
    };

    await editRecruiterInformation(requestData);
    return res.status(200).send({ message: 'Edit profile success!' });
  } else if (isCandidate) {
    const { name, job, domicile, workPlace, description, skills, instagram, github } = req.body;
    const stringifySkills = JSON.stringify(skills?.split(',')?.map(value => value.trim()));

    const newName = name || userCompleteData?.name;
    const newJob = job || userCompleteData?.job;
    const newDomicile = domicile || userCompleteData?.domicile;
    const newWorkPlace = workPlace || userCompleteData?.work_place;
    const newDescription = description || userCompleteData?.description;
    const newSkills = stringifySkills || userCompleteData?.skills;
    const newInstagram = instagram || userCompleteData?.instagram;
    const newGithub = github || userCompleteData?.github;
    const newProfilePicture = profilePicture || userCompleteData?.profilePicture;
    const newCoverImage = coverImage || userCompleteData?.coverImage;

    const requestData = {
      newName,
      newJob,
      newDomicile,
      newWorkPlace,
      newDescription,
      newSkills,
      newInstagram,
      newGithub,
      newProfilePicture,
      newCoverImage,
      userId
    };

    await editCandidateInformation(requestData);

    return res.status(200).send({ message: 'Edit profile success!' });
  } else {
    throw new ErrorResponse('Invalid users role!');
  }
};

const joinProfileAndUser = async (userId) => {
  const getUserTable = await getUserById(userId);
  const tempUserData = getUserTable?.rows?.[0];
  const tempRoleId = tempUserData?.role_id;

  if (tempRoleId === 1) {
    const recruiterData = await getRecruiterByUserId(userId);
    const tempRecruiterData = recruiterData?.rows?.[0];

    const recruiterDataManipulation = {
      ...tempRecruiterData,
      email: tempUserData.email,
      phoneNumber: tempUserData.phonenumber,
      roleId: tempUserData.role_id,
      profilePicture: tempUserData.profile_picture,
      coverImage: tempUserData.cover_image
    };

    return recruiterDataManipulation;
  }

  if (tempRoleId === 2) {
    const candidateData = await getCandidateByUserId(userId);
    const tempCandidateData = candidateData?.rows?.[0];

    const candidateDataManipulation = {
      ...tempCandidateData,
      email: tempUserData.email,
      roleId: tempUserData.role_id,
      profilePicture: tempUserData.profile_picture,
      coverImage: tempUserData.cover_image
    };

    return candidateDataManipulation;
  }
};

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
  if (!experienceIdChecker?.rowCount) throw new ErrorResponse('Experience not found');

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
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');

  const { experienceId } = req.params;
  const experienceIdChecker = await getExperienceById(experienceId);
  if (!experienceIdChecker?.rowCount) throw new ErrorResponse('Experience not found');

  await deleteUserExperienceModel(experienceId, profileId);
  res.status(200).send({ message: 'Experience has been deleted' });
};

const getUserPortofolios = async (req, res) => {
  const { id } = req.params;
  const candidateChecker = await getCandidateById(id);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');
  const getAllUserPortofolios = await getUserPortofoliosModel(id);
  res.status(200).send(getAllUserPortofolios.rows);
};

const addUserPortofolio = async (req, res) => {
  const { profileId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker.rowCount) throw new ErrorResponse('Candidate not found!', 404);

  const { appName, link, type } = req.body;
  const appPicture = req.file?.path;

  if (!appName) throw new ErrorResponse('App name is required!');

  await addUserPortofolioModel({ profileId, appName, link, type, appPicture });
  res.status(200).send({ message: 'Portofolio successfuly added!' });
};

const editUserPortofolio = async (req, res) => {
  const { profileId, portofolioId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker.rowCount) throw new ErrorResponse('Candidate not found!', 404);

  const { appName, link, type } = req.body;
  const appPicture = req?.file?.path;

  const portofolioData = await getPortofolioById(portofolioId);
  if (!portofolioData?.rowCount) throw new ErrorResponse('Portofolio not found!', 404);
  const tempPortofolioData = portofolioData?.rows?.[0];

  const newAppName = appName || tempPortofolioData?.app_name;
  const newLink = link || tempPortofolioData?.link;
  const newType = type || tempPortofolioData?.type;
  const newAppPicture = appPicture || tempPortofolioData?.app_picture;

  await editUserPortofolioModel({ profileId, portofolioId, newAppName, newLink, newType, newAppPicture });

  res.status(200).send({ message: 'Edit portofolio succesful!' });
};

const deleteUserPortofolio = async (req, res) => {
  const { profileId, portofolioId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');

  const portofolioIdChecker = await getPortofolioById(portofolioId);
  if (!portofolioIdChecker?.rowCount) throw new ErrorResponse('Portofolio not found');

  await deleteUserPortofolioModel(portofolioId, profileId);
  res.status(200).send({ message: 'Portofolio has been deleted' });
};

module.exports = {
  getUserExperiences,
  addUserExperiences,
  updateUserExperiences,
  deleteUserExperiences,
  getProfile,
  editProfile,
  getUserPortofolios,
  addUserPortofolio,
  editUserPortofolio,
  deleteUserPortofolio
};
