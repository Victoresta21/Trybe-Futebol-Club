import Team from '../database/models/team';
import Match from '../database/models/match';
import IMatch from '../Interface/Imatch';
import error from '../util/errorMensage';

class MatchesService {
  public getAll = async () => {
    const teamHomeOption = { model: Team, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: Team, as: 'teamAway', attributes: ['teamName'] };

    const matchesData = await Match
      .findAll({ include: [teamHomeOption, teamAwayOption] });

    return { status: 200, matchesData };
  };

  public getByProgress = async (progressOption: string) => {
    const teamHomeOption = { model: Team, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: Team, as: 'teamAway', attributes: ['teamName'] };
    const inProgress = progressOption === 'true' ? 1 : 0;

    const matchesData = await Match
      .findAll({ where: { inProgress }, include: [teamHomeOption, teamAwayOption] });

    return { status: 200, matchesData };
  };

  public validateNewMatch = async (match: IMatch) => {
    if (match.awayTeam === match.homeTeam) throw error.sameTeams;
    const teamsData = await Team.findAll();
    const teamsIdList = await teamsData.map((teams) => teams.id);
    const awayIdFound = teamsIdList.find((id: number) => id === match.awayTeam);
    const homeIdFound = teamsIdList.find((id: number) => id === match.homeTeam);
    if (!awayIdFound || !homeIdFound) throw error.thisIdDoesNotExist;
  };

  public create = async (match: IMatch) => {
    await this.validateNewMatch(match);
    const createdMatch = await Match.create(match);
    return createdMatch;
  };

  public update = async (id: string) => {
    await Match.update({ inProgress: false }, { where: { id } });
  };
}

export default MatchesService;
