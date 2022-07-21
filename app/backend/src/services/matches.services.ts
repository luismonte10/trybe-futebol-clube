import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import { IMatch } from '../interfaces/matches.interface';

const getAllMatches = async () => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  return matches;
};

const createMatch = async (match: IMatch) => {
  const createdMatch = await Matches.create(match);

  return createdMatch;
};

export default { getAllMatches, createMatch };
