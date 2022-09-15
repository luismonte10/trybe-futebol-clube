import Teams from '../database/models/teams';
// import sequelize from '../database/models';
import Matches from '../database/models/matches';
import { createLeaderboardHome } from '../utils/leaderboardHome';

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

export default { getLeaderboardHome };
