import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

const getAllMatches = async () => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  return matches;
};

export default { getAllMatches };
