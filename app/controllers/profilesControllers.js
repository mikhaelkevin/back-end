const { ErrorResponse } = require('../../utils/errorResponse');
const { getUserById, getCandidateByUserId, getRecruiterByUserId } = require('../models/User');
const { editCandidateInformation, editRecruiterInformation } = require('../models/Profile');

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

    const newName = name || userCompleteData?.name;
    const newJob = job || userCompleteData?.job;
    const newDomicile = domicile || userCompleteData?.domicile;
    const newWorkPlace = workPlace || userCompleteData?.work_place;
    const newDescription = description || userCompleteData?.description;
    const newSkills = skills || userCompleteData?.skills;
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

module.exports = { getProfile, editProfile };
