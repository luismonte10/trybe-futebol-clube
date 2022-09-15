import home from './leaderboardHome';
import away from './leaderboardAway';

const createLeaderboard = (teams: any) => {
  const leaderboard = teams.map((team: any) => {
    const name = team.teamName;
    const totalPoints = home.getTotalPoints(team.teamHome) + away.getTotalPoints(team.teamAway);
    const totalGames = home.getTotalGames(team.teamHome) + away.getTotalGames(team.teamAway);
    const totalVictories = home.getTotalVictories(team.teamHome) + away
      .getTotalVictories(team.teamAway);
    const totalDraws = home.getTotalDraws(team.teamHome) + away.getTotalDraws(team.teamAway);
    const totalLosses = home.getTotalLosses(team.teamHome) + away.getTotalLosses(team.teamAway);
    const goalsFavor = home.getTotalGoalsFavor(team.teamHome) + away
      .getTotalGoalsFavor(team.teamAway);
    const goalsOwn = home.getTotalGoalsOwn(team.teamHome) + away.getTotalGoalsOwn(team.teamAway);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    const total = { totalPoints, totalGames, totalVictories, totalDraws, totalLosses };
    const goals = { goalsFavor, goalsOwn, goalsBalance };

    return { name, ...total, ...goals, efficiency };
  });

  return home.sortLeaderboardHome(leaderboard);
};

export default createLeaderboard;
