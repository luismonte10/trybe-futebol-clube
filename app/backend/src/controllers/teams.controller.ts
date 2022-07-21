import { Request, Response } from 'express';
import teamService from '../services/teams.services';

const getAllTeams = async (_req: Request, res: Response) => {
  const teams = await teamService.getAllTeams();

  return res.status(200).json(teams);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamService.getTeamById(Number(id));

  return res.status(200).json(team);
};

export default { getAllTeams, getTeamById };
