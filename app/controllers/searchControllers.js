const { ErrorResponse } = require('../../utils/errorResponse');
const { getCandidateByDomicile, getCandidateBySkills, getCandidateByName, getAllCandidates } = require('../models/Search');

const getCandidates = async (req, res) => {
  // Sort by type : name/skill/domicile

  const sortBy = req?.query?.sortBy?.toLowerCase() ?? '';
  const value = req?.query?.value?.toLowerCase() ?? '';

  const sortByRules = sortBy !== 'name' && sortBy !== 'domicile' && sortBy !== 'skill' && sortBy !== '';
  if (sortByRules) throw new ErrorResponse('Invalid sort type');

  const sortByNameRules = ((!sortBy && value) || sortBy === 'name');
  if (sortByNameRules) {
    const getCandidateResults = await getCandidateByName(value);
    const candidateData = getCandidateResults?.rows?.map(value => ({
      id: value?.id,
      name: value?.name,
      job: value?.job,
      domicile: value?.domicile,
      workPlace: value?.work_place,
      description: value?.description,
      skills: value?.skills,
      instagram: value?.instagram,
      github: value?.github,
      userId: value?.user_id
    }));
    return res.status(200).send(candidateData);
  }

  const sortByDomicileRules = (sortBy === 'domicile');
  if (sortByDomicileRules) {
    const getCandidateResults = await getCandidateByDomicile(value);
    const candidateData = getCandidateResults?.rows?.map(value => ({
      id: value?.id,
      name: value?.name,
      job: value?.job,
      domicile: value?.domicile,
      workPlace: value?.work_place,
      description: value?.description,
      skills: value?.skills,
      instagram: value?.instagram,
      github: value?.github,
      userId: value?.user_id
    }));
    return res.status(200).send(candidateData);
  }

  const sortBySkillRules = (sortBy === 'skill');
  if (sortBySkillRules) {
    const getCandidateResults = await getCandidateBySkills(value);
    const candidateData = getCandidateResults?.rows?.map(value => ({
      id: value?.id,
      name: value?.name,
      job: value?.job,
      domicile: value?.domicile,
      workPlace: value?.work_place,
      description: value?.description,
      skills: value?.skills,
      instagram: value?.instagram,
      github: value?.github,
      userId: value?.user_id
    }));
    return res.status(200).send(candidateData);
  }

  const getAllCandidateResults = await getAllCandidates();

  const candidateData = getAllCandidateResults?.rows?.map(value => ({
    id: value?.id,
    name: value?.name,
    job: value?.job,
    domicile: value?.domicile,
    workPlace: value?.work_place,
    description: value?.description,
    skills: value?.skills,
    instagram: value?.instagram,
    github: value?.github,
    userId: value?.user_id
  }));

  res.status(200).send(candidateData);
};

module.exports = { getCandidates };
