import Match from '../database/models/match';
import IMatch from '../Interface/Imatch';
import ITeamBoard from '../Interface/Iteamboard';
import MatchesService from './matches';

class awayLeaderboard {
  public service = new MatchesService();

  public getTeamName = (teamNumber: number, matchesData: Array<Match>) => {
    const foundObj = matchesData.find((match) => teamNumber === match.awayTeam) as IMatch;
    return foundObj.teamAway.teamName as string;
  };

  public getTeamGoalsFavor = (teamNumber: number, matchesData: Array<Match>) => {
    const awayTeamGoalsList: Array<number> = [];
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber) awayTeamGoalsList.push(match.awayTeamGoals);
    });
    const totalTeamGoalsFavor = awayTeamGoalsList
      .reduce((prev, curr) => prev + curr);
    return totalTeamGoalsFavor;
  };

  public getTeamGoalsOwn = (teamNumber: number, matchesData: Array<Match>) => {
    const awayTeamGoalsList: Array<number> = [];
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber) awayTeamGoalsList.push(match.homeTeamGoals);
    });
    const totalAwayTeamOwn = awayTeamGoalsList
      .reduce((prev, curr) => prev + curr);
    return totalAwayTeamOwn;
  };

  public getTotalGames = (teamNumber: number, matchesData: Array<Match>) => {
    let totalGames = 0;
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber) totalGames += 1;
    });
    return totalGames;
  };

  public getTotalVictories = (teamNumber: number, matchesData: Array<Match>) => {
    let totalVictories = 0;
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber
        && match.awayTeamGoals > match.homeTeamGoals) totalVictories += 1;
    });
    return totalVictories;
  };

  public getTotalDraws = (teamNumber: number, matchesData: Array<Match>) => {
    let totalDraws = 0;
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber
        && match.awayTeamGoals === match.homeTeamGoals) totalDraws += 1;
    });
    return totalDraws;
  };

  public getTotalLosses = (teamNumber: number, matchesData: Array<Match>) => {
    let totalLosses = 0;
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber
        && match.awayTeamGoals < match.homeTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  };

  public buildTeamData = (teamNumber: number, matchesData: Array<Match>): ITeamBoard => {
    const totalVictories = this.getTotalVictories(teamNumber, matchesData);
    const totalDraws = this.getTotalDraws(teamNumber, matchesData);
    const goalsFavor = this.getTeamGoalsFavor(teamNumber, matchesData);
    const goalsOwn = this.getTeamGoalsOwn(teamNumber, matchesData);
    const totalPoints = (totalVictories * 3) + (totalDraws * 1);
    const totalGames = this.getTotalGames(teamNumber, matchesData);

    return {
      name: this.getTeamName(teamNumber, matchesData),
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: this.getTotalLosses(teamNumber, matchesData),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };
  };

  public sortLeaderBoard = (unsortedLeaderboard: Array<ITeamBoard>) => {
    const sortedLeaderboard = unsortedLeaderboard.sort((teamA, teamB) => {
      if (teamA.totalPoints < teamB.totalPoints) return 1;
      if (teamA.totalPoints > teamB.totalPoints) return -1;

      if (teamA.totalVictories < teamB.totalVictories) return 1;
      if (teamA.totalVictories > teamB.totalVictories) return -1;

      if (teamA.goalsBalance < teamB.goalsBalance) return 1;
      if (teamA.goalsBalance > teamB.goalsBalance) return -1;

      if (teamA.goalsFavor < teamB.goalsFavor) return 1;
      if (teamA.goalsFavor > teamB.goalsFavor) return -1;

      if (teamA.goalsOwn < teamB.goalsOwn) return 1;
      if (teamA.goalsOwn > teamB.goalsOwn) return -1;
      return 0;
    });
    return sortedLeaderboard;
  };

  public leaderboardawayService = async () => {
    const { matchesData } = await this.service.getByProgress('false');
    console.log(matchesData);
    const listOfTeamNumbers: Array<number> = [];
    matchesData.map((match) => !listOfTeamNumbers
      .includes(match.awayTeam) && listOfTeamNumbers.push(match.awayTeam)) as Array<number>;

    const leaderboardaway = listOfTeamNumbers.map((teamNumber) => (this
      .buildTeamData(teamNumber, matchesData) as ITeamBoard));

    const sortedLeaderBoardAway = this.sortLeaderBoard(leaderboardaway);
    console.log(sortedLeaderBoardAway);
    return sortedLeaderBoardAway;
  };
}

export default awayLeaderboard;
