const { ErrorResponse } = require('../../utils/errorResponse');
const { getCandidateByDomicile, getCandidateBySkills, getCandidateByName, getAllCandidates } = require('../models/Search');
const { joinProfileAndUser } = require('../controllers/profilesControllers');

const getCandidates = async (req, res) => {
  // Sort by type : name/skill/domicile

  const sortBy = req?.query?.sortBy?.toLowerCase() ?? '';
  const value = req?.query?.value?.toLowerCase() ?? '';

  const sortByRules = sortBy !== 'name' && sortBy !== 'domicile' && sortBy !== 'skill' && sortBy !== '';
  if (sortByRules) throw new ErrorResponse('Invalid sort type');

  const sortByNameRules = ((!sortBy && value) || sortBy === 'name');
  if (sortByNameRules) {
    const getCandidateResults = await getCandidateByName(value);
    const candidateData = getCandidateResults?.rows?.map(value => ({ id: value?.id }));

    await Promise.all(candidateData.map(async data => {
      const temp = await joinProfileAndUser(data.id);
      data.name = temp?.name;
      data.job = temp?.job || 'Unknown';
      data.domicile = temp?.domicile || 'Unknown';
      data.skills = temp?.skills;
      data.profilePicture = temp?.profilePicture;
    }));

    return res.status(200).send(candidateData);
  }

  const sortByDomicileRules = (sortBy === 'domicile');
  if (sortByDomicileRules) {
    const getCandidateResults = await getCandidateByDomicile(value);
    const candidateData = getCandidateResults?.rows?.map(value => ({ id: value?.id }));

    await Promise.all(candidateData.map(async data => {
      const temp = await joinProfileAndUser(data.id);
      data.name = temp?.name;
      data.job = temp?.job || 'Unknown';
      data.domicile = temp?.domicile || 'Unknown';
      data.skills = temp?.skills;
      data.profilePicture = temp?.profilePicture;
    }));

    return res.status(200).send(candidateData);
  }

  const sortBySkillRules = (sortBy === 'skill');
  if (sortBySkillRules) {
    const getCandidateResults = await getCandidateBySkills(value);
    const candidateData = getCandidateResults?.rows?.map(value => ({ id: value?.id }));

    await Promise.all(candidateData.map(async data => {
      const temp = await joinProfileAndUser(data.id);
      data.name = temp?.name;
      data.job = temp?.job || 'Unknown';
      data.domicile = temp?.domicile || 'Unknown';
      data.skills = temp?.skills;
      data.profilePicture = temp?.profilePicture;
    }));

    return res.status(200).send(candidateData);
  }

  const getAllCandidateResults = await getAllCandidates();

  const candidateData = getAllCandidateResults?.rows?.map(value => ({ id: value?.id }));

  await Promise.all(candidateData.map(async data => {
    const temp = await joinProfileAndUser(data.id);
    data.name = temp?.name;
    data.job = temp?.job || 'Unknown';
    data.domicile = temp?.domicile || 'Unknown';
    data.skills = temp?.skills;
    data.profilePicture = temp?.profilePicture;
  }));

  res.status(200).send(candidateData);
};

module.exports = { getCandidates };
