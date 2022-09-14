import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import { IMatch } from '../interfaces/matches.interface';

const getAllMatches = async (inProgress?: string) => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  if (inProgress === 'true') return matches.filter((match) => match.inProgress === true);
  if (inProgress === 'false') return matches.filter((match) => match.inProgress === false);

  return matches;
};

const createMatch = async (match: IMatch) => {
  const createdMatch = await Matches.create(match);

  return createdMatch;
};

const finishMatch = async (id: number) => {
  await Matches.update({ inProgress: false }, { where: { id } });
};

const updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  const updatedMatch = await Matches.findByPk(id);

  return updatedMatch;
};

export default { getAllMatches, createMatch, finishMatch, updateMatch };
