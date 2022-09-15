import Teams from '../database/models/teams';
// import sequelize from '../database/models';
import Matches from '../database/models/matches';
import { createLeaderboardHome } from '../utils/leaderboardHome';
import { createLeaderboardAway } from '../utils/leaderboardAway';

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

export default { getLeaderboardHome, getLeaderboardAway };
