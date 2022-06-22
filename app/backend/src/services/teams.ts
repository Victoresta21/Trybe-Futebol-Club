import Team from '../database/models/team';

class TeamsService {
  public getAll = async () => {
    const teamsData = await Team.findAll();

    return { status: 200, teamsData };
  };

  public findById = async (id: string) => {
    const teamData = await Team.findByPk(id);

    return { status: 200, teamData };
  };
}

export default TeamsService;
