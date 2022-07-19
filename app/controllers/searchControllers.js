const { ErrorResponse } = require('../../utils/errorResponse');
const { getCandidateByDomicile, getCandidateBySkills, getCandidateByName, getAllCandidates } = require('../models/Search');

const getCandidates = async (req, res) => {
  // Sort by type : name/skill/domicile

  const sortBy = req?.query?.sortBy?.toLowerCase() ?? '';
  const value = req?.query?.value?.toLowerCase() ?? '';

  const sortByRules = sortBy !== 'name' && sortBy !== 'domicile' && sortBy !== 'skill' && sortBy !== '';
  if (sortByRules) throw new ErrorResponse('invalid sort type');

  const sortByNameRules = ((!sortBy && value) || sortBy === 'name');
  if (sortByNameRules) {
    const getCandidateResults = await getCandidateByName(value);
    return res.status(200).send({ message: 'Sort by name success!', data: getCandidateResults.rows });
  }

  const sortByDomicileRules = (sortBy === 'domicile');
  if (sortByDomicileRules) {
    const getCandidateResults = await getCandidateByDomicile(value);
    return res.status(200).send({ message: 'Sort by domicile success!', data: getCandidateResults.rows });
  }

  const sortBySkillRules = (sortBy === 'skill');
  if (sortBySkillRules) {
    const getCandidateResults = await getCandidateBySkills(value);
    return res.status(200).send({ message: 'Data found!', data: getCandidateResults.rows });
  }

  const getAllCandidateResults = await getAllCandidates();
  res.status(200).send({ message: 'Get all candidates success!', data: getAllCandidateResults.rows });
};

module.exports = { getCandidates };
