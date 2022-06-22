import Team from '../database/models/team';
import Matche from '../database/models/matche';

class MatchesService {
  public getAll = async () => {
    const teamHomeOption = { model: Team, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: Team, as: 'teamAway', attributes: ['teamName'] };

    const matchesData = await Matche
      .findAll({ include: [teamHomeOption, teamAwayOption] });

    return { status: 200, matchesData };
  };

  public getByProgress = async (progressOption: string) => {
    const teamHomeOption = { model: Team, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: Team, as: 'teamAway', attributes: ['teamName'] };
    const inProgress = progressOption === 'true' ? 1 : 0;

    const matchesData = await Matche
      .findAll({ where: { inProgress }, include: [teamHomeOption, teamAwayOption] });

    return { status: 200, matchesData };
  };
}

export default MatchesService;
