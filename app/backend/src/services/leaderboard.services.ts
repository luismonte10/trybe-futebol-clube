import Teams from '../database/models/teams';
// import sequelize from '../database/models';
import Matches from '../database/models/matches';
import { createLeaderboardHome } from '../utils/leaderboardHome';
import { createLeaderboardAway } from '../utils/leaderboardAway';
import createLeaderboard from '../utils/leaderboard';

const getLeaderboard = async () => {
  const teams = await Teams.findAll(
    {
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } },
        { model: Matches, as: 'teamAway', where: { inProgress: false } },
      ],
    },
  );

  const leaderboard = createLeaderboard(teams);

  return leaderboard;
};

const getLeaderboardHome = async () => {
  const teams = await Teams.findAll(
    {
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } },
      ],
    },
  );

  const leaderboardHome = createLeaderboardHome(teams);

  return leaderboardHome;
};

const getLeaderboardAway = async () => {
  const teams = await Teams.findAll(
    {
      include: [
        { model: Matches, as: 'teamAway', where: { inProgress: false } },
      ],
    },
  );

  const leaderboardAway = createLeaderboardAway(teams);

  return leaderboardAway;
};

export default { getLeaderboard, getLeaderboardHome, getLeaderboardAway };
