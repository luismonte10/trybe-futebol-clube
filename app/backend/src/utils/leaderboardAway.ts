import { ILeaderboard } from '../interfaces/leaderboard.interface';
import { IMatch } from '../interfaces/matches.interface';

const getTotalPoints = (matches: IMatch[]) => {
  let totalPoints = 0;

  matches.forEach((match: IMatch) => {
    if (match.homeTeamGoals < match.awayTeamGoals) totalPoints += 3;
    if (match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
  });

  return totalPoints;
};

const getTotalGames = (matches: IMatch[]) => {
  let totalGames = 0;

  matches.forEach(() => {
    totalGames += 1;
  });

  return totalGames;
};

const getTotalVictories = (matches: IMatch[]) => {
  let totalVictories = 0;

  matches.forEach((match: IMatch) => {
    if (match.homeTeamGoals < match.awayTeamGoals) totalVictories += 1;
  });

  return totalVictories;
};

const getTotalDraws = (matches: IMatch[]) => {
  let totalDraws = 0;

  matches.forEach((match: IMatch) => {
    if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
  });

  return totalDraws;
};

const getTotalLosses = (matches: IMatch[]) => {
  let totalLosses = 0;

  matches.forEach((match: IMatch) => {
    if (match.homeTeamGoals > match.awayTeamGoals) totalLosses += 1;
  });

  return totalLosses;
};

const getTotalGoalsFavor = (matches: IMatch[]) => {
  let goalsFavor = 0;

  matches.forEach((match: IMatch) => {
    goalsFavor += match.awayTeamGoals;
  });

  return goalsFavor;
};

const getTotalGoalsOwn = (matches: IMatch[]) => {
  let goalsOwn = 0;

  matches.forEach((match: IMatch) => {
    goalsOwn += match.homeTeamGoals;
  });

  return goalsOwn;
};

const getGoalsBalance = (goalsFavor: number, goalsOwn: number) => {
  const goalsBalance = goalsFavor - goalsOwn;

  return goalsBalance;
};

const getEfficiency = (totalPoints: number, totalGames: number) => {
  const efficiency = Number((totalPoints / (totalGames * 3)) * 100);

  return efficiency.toFixed(2);
};

const sortLeaderboardAway = (leaderboardAway: ILeaderboard[]) => (
  leaderboardAway
    .sort((a, b) => b.goalsOwn - a.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalVictories - a.totalVictories)
    .sort((a, b) => b.totalPoints - a.totalPoints)
);

export const createLeaderboardAway = (teams: any) => {
  const leaderboardAway = teams.map((team: any) => {
    const name = team.teamName;
    const totalPoints = getTotalPoints(team.teamAway);
    const totalGames = getTotalGames(team.teamAway);
    const totalVictories = getTotalVictories(team.teamAway);
    const totalDraws = getTotalDraws(team.teamAway);
    const totalLosses = getTotalLosses(team.teamAway);
    const goalsFavor = getTotalGoalsFavor(team.teamAway);
    const goalsOwn = getTotalGoalsOwn(team.teamAway);
    const goalsBalance = getGoalsBalance(goalsFavor, goalsOwn);
    const efficiency = getEfficiency(totalPoints, totalGames);

    const total = { totalPoints, totalGames, totalVictories, totalDraws, totalLosses };
    const goals = { goalsFavor, goalsOwn, goalsBalance };

    return { name, ...total, ...goals, efficiency };
  });

  return sortLeaderboardAway(leaderboardAway);
};

export default {
  getTotalPoints,
  getTotalGames,
  getTotalVictories,
  getTotalDraws,
  getTotalLosses,
  getTotalGoalsFavor,
  getTotalGoalsOwn,
};
