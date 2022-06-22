import CustomError from './customError';

const sameTeams = new
CustomError('It is not possible to create a match with two equal teams', 401);
const thisIdDoesNotExist = new CustomError('There is no team with such id!', 404);

export default {
  sameTeams,
  thisIdDoesNotExist,
};
