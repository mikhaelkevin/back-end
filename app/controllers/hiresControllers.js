const { ErrorResponse } = require('../../utils/errorResponse');
const { getAllHires, getDetailHire, insertHireMassage } = require('../models/Hire');
const { getRecruiterById, getCandidateById } = require('../models/User');

const getHireMessages = async (req, res) => {
  const { profileId } = req.params;

  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker.rowCount) throw new ErrorResponse('Candidate not found!', 404);

  const getAllHiresResults = await getAllHires(profileId);

  const hireList = getAllHiresResults?.rows?.map(value => ({
    id: value?.id,
    recruiterProfilesId: value?.recruiter_profiles_id,
    candidateProfilesId: value?.candidate_profiles_id,
    messageSubject: value?.message_subject,
    description: value?.description
  }));
  res.status(200).send(hireList);
};

const getDetailHireMessage = async (req, res) => {
  const { profileId, hireId } = req.params;

  const candidateChecker = await getCandidateById(profileId);
  if (!candidateChecker.rowCount) throw new ErrorResponse('Candidate not found!', 404);

  const getDetailHireResult = await getDetailHire(profileId, hireId);
  if (!getDetailHireResult?.rowCount) throw new ErrorResponse('Hire messages not found!', 404);

  const detailHireMessage = getDetailHireResult?.rows?.map(value => ({
    recruiterProfilesId: value?.recruiter_profiles_id,
    candidateProfilesId: value?.candidate_profiles_id,
    messageSubject: value?.message_subject,
    description: value?.description,
    id: value?.id
  }));

  res.status(200).send(detailHireMessage);
};

const addHireMessage = async (req, res) => {
  const { recruiterId, messageSubject, description } = req.body;
  const candidateId = req.params?.profileId;

  const mandatoryFieldIsBlank = !recruiterId || !candidateId || !messageSubject;
  if (mandatoryFieldIsBlank) throw new ErrorResponse('Recruiter, candidate and message subject is required', 422);

  const recruiterIdChecker = await getRecruiterById(recruiterId);
  if (!recruiterIdChecker?.rowCount) throw new ErrorResponse('Recruiter not found!', 404);

  const candidateIdChecker = await getCandidateById(candidateId);
  if (!candidateIdChecker?.rowCount) throw new ErrorResponse('Candidate not found!', 404);

  await insertHireMassage({ recruiterId, candidateId, messageSubject, description });
  res.status(200).send({ message: 'hire message sended' });
};
module.exports = { getHireMessages, getDetailHireMessage, addHireMessage };
