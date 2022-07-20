const { getAllHires, getDetailHire, insertHireMassage } = require('../models/Hire');
const { getRecruiterById, getCandidateById } = require('../models/User');

const getHireMessages = async (req, res) => {
  const getAllHiresResults = await getAllHires();
  res.status(200).send(getAllHiresResults.rows);
};

const getDetailHireMessage = async (req, res) => {
  const { id } = req.params;
  const getDetailHireResult = await getDetailHire(id);
  res.status(200).send(getDetailHireResult.rows);
};

const addHireMessage = async (req, res) => {
  const { recruiterId, candidateId, messageSubject, description } = req.body;

  const mandatoryFieldIsBlank = !recruiterId || !candidateId || !messageSubject;
  if (mandatoryFieldIsBlank) throw new Error('RecruiterId, CandidateId and Message Subject is required');

  const recruiterIdChecker = await getRecruiterById(recruiterId);
  if (!recruiterIdChecker?.rowCount) throw new Error('Recruiter not found!');

  const candidateIdChecker = await getCandidateById(candidateId);
  if (!candidateIdChecker?.rowCount) throw new Error('Candidate not found!');

  await insertHireMassage({ recruiterId, candidateId, messageSubject, description });
  res.status(200).send({ message: 'hire message sended' });
};
module.exports = { getHireMessages, getDetailHireMessage, addHireMessage };
