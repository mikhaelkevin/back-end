const { ErrorResponse } = require('../../utils/errorResponse');
const cloudinary = require('../../utils/cloudinary');
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

    const newCompanyName = companyName || userCompleteData?.companyName;
    const newCompanyField = companyField || userCompleteData?.companyField;
    const newCompanyDomicile = companyDomicile || userCompleteData?.companyDomicile;
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
    const newWorkPlace = workPlace || userCompleteData?.workPlace;
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
      id: tempRecruiterData.id,
      companyName: tempRecruiterData.company_name,
      companyField: tempRecruiterData.company_field,
      companyDomicile: tempRecruiterData.company_domicile,
      description: tempRecruiterData.description,
      instagram: tempRecruiterData.instagram,
      linkedin: tempRecruiterData.linkedin,
      userId: tempRecruiterData.user_id,
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
      id: tempCandidateData.id,
      name: tempCandidateData.name,
      job: tempCandidateData.job,
      domicile: tempCandidateData.domicile,
      workPlace: tempCandidateData.work_place,
      description: tempCandidateData.description,
      skills: tempCandidateData.skills,
      instagram: tempCandidateData.instagram,
      github: tempCandidateData.github,
      userId: tempCandidateData.user_id,
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
  const userExperiences = getAllUserExperiences?.rows?.map(value => ({
    id: value?.id,
    position: value?.position,
    companyName: value?.company_name,
    startDate: value?.start_date,
    endDate: value?.end_date,
    description: value?.description,
    candidateProfileId: value?.candidate_profile_id
  }));
  res.status(200).send(userExperiences);
};

const addUserExperiences = async (req, res) => {
  const { id } = req.params;
  const candidateChecker = await getCandidateById(id);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');

  const { position, companyName, startDate, endDate, description } = req.body;
  const requiredFieldIsBlank = !position || !companyName;
  const invalidDateRange = startDate >= endDate;
  if (requiredFieldIsBlank) throw new ErrorResponse('Position and company name is required!');
  if (invalidDateRange) throw new ErrorResponse('Start date must be less than end date!');

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
  console.log('getAllUserPortofolios', getAllUserPortofolios.rows);
  const userPortofolios = getAllUserPortofolios?.rows?.map(value => ({
    id: value?.id,
    appName: value?.app_name,
    link: value?.link,
    type: value?.type,
    appPicture: value?.app_picture,
    appPicId: value?.cloud_app_picture_id,
    candidateProfileId: value?.candidate_profile_id
  }));
  res.status(200).send(userPortofolios);
};

const addUserPortofolio = async (req, res) => {
  const { profileId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker.rowCount) throw new ErrorResponse('Candidate not found!', 404);

  const { appName, link, type } = req.body;
  let appPicture = req.file?.path;
  let appPictureCloudId;

  if (!appName) throw new ErrorResponse('App name is required!');

  if (appPicture) {
    const cloudinaryUpload = await cloudinary.uploader.upload(appPicture);
    appPicture = cloudinaryUpload.secure_url;
    appPictureCloudId = cloudinaryUpload.public_id;
  }

  await addUserPortofolioModel({ profileId, appName, link, type, appPicture, appPictureCloudId });
  res.status(200).send({ message: 'Portofolio successfuly added!' });
};

const editUserPortofolio = async (req, res) => {
  const { profileId, portofolioId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker.rowCount) throw new ErrorResponse('Candidate not found!', 404);

  const { appName, link, type } = req.body;
  let appPicture = req.file?.path;
  let appPictureCloudId;

  const portofolioData = await getPortofolioById(portofolioId, profileId);
  if (!portofolioData?.rowCount) throw new ErrorResponse('User portofolio not found!', 404);

  const tempPortofolioData = portofolioData?.rows?.[0];

  if (appPicture) {
    await cloudinary.uploader.destroy(tempPortofolioData?.cloud_app_picture_id);
    const cloudinaryUpload = await cloudinary.uploader.upload(appPicture);
    appPicture = cloudinaryUpload.secure_url;
    appPictureCloudId = cloudinaryUpload.public_id;
  }

  const newAppName = appName || tempPortofolioData?.app_name;
  const newLink = link || tempPortofolioData?.link;
  const newType = type || tempPortofolioData?.type;
  const newAppPicture = appPicture || tempPortofolioData?.app_picture;
  const newAppPicCloudId = appPictureCloudId || tempPortofolioData?.cloud_app_picture_id;

  await editUserPortofolioModel({ profileId, portofolioId, newAppName, newLink, newType, newAppPicture, newAppPicCloudId });

  res.status(200).send({ message: 'Edit portofolio succesful!' });
};

const deleteUserPortofolio = async (req, res) => {
  const { profileId, portofolioId } = req.params;
  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker?.rowCount) throw new ErrorResponse('Candidate not found');

  const portofolioIdChecker = await getPortofolioById(portofolioId, profileId);
  if (!portofolioIdChecker?.rowCount) throw new ErrorResponse('User portofolio not found!', 404);

  await cloudinary.uploader.destroy(portofolioIdChecker.rows?.[0]?.cloud_app_picture_id);
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
