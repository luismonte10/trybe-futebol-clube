import { ITeam } from '../interfaces/teams.interface';
import Teams from '../database/models/teams';

const getAllTeams = async (): Promise<ITeam[]> => {
  const teams = await Teams.findAll();

  return teams;
};

const getTeamById = async (id: number): Promise<ITeam | null> => {
  const team = await Teams.findByPk(id);

  return team;
};

export default { getAllTeams, getTeamById };
