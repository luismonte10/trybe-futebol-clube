import { ILeaderboard } from '../interfaces/leaderboard.interface';
import { IMatch } from '../interfaces/matches.interface';

const getTotalPoints = (matches: IMatch[]) => {
  let totalPoints = 0;

  matches.forEach((match: IMatch) => {
    if (match.homeTeamGoals > match.awayTeamGoals) totalPoints += 3;
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
    if (match.homeTeamGoals > match.awayTeamGoals) totalVictories += 1;
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
    if (match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
  });

  return totalLosses;
};

const getTotalGoalsFavor = (matches: IMatch[]) => {
  let goalsFavor = 0;

  matches.forEach((match: IMatch) => {
    goalsFavor += match.homeTeamGoals;
  });

  return goalsFavor;
};

const getTotalGoalsOwn = (matches: IMatch[]) => {
  let goalsOwn = 0;

  matches.forEach((match: IMatch) => {
    goalsOwn += match.awayTeamGoals;
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

const sortLeaderboardHome = (leaderboardHome: ILeaderboard[]) => (
  leaderboardHome
    .sort((a, b) => b.goalsOwn - a.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalVictories - a.totalVictories)
    .sort((a, b) => b.totalPoints - a.totalPoints)
);

export const createLeaderboardHome = (teams: any) => {
  const leaderboardHome = teams.map((team: any) => {
    const name = team.teamName;
    const totalPoints = getTotalPoints(team.teamHome);
    const totalGames = getTotalGames(team.teamHome);
    const totalVictories = getTotalVictories(team.teamHome);
    const totalDraws = getTotalDraws(team.teamHome);
    const totalLosses = getTotalLosses(team.teamHome);
    const goalsFavor = getTotalGoalsFavor(team.teamHome);
    const goalsOwn = getTotalGoalsOwn(team.teamHome);
    const goalsBalance = getGoalsBalance(goalsFavor, goalsOwn);
    const efficiency = getEfficiency(totalPoints, totalGames);

    const total = { totalPoints, totalGames, totalVictories, totalDraws, totalLosses };
    const goals = { goalsFavor, goalsOwn, goalsBalance };

    return { name, ...total, ...goals, efficiency };
  });

  return sortLeaderboardHome(leaderboardHome);
};

export default {
  getTotalPoints,
  getTotalGames,
  getTotalVictories,
  getTotalDraws,
  getTotalLosses,
  getTotalGoalsFavor,
  getTotalGoalsOwn,
  sortLeaderboardHome,
};
