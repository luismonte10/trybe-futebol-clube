import { Request, Response } from 'express';
import matchesService from '../services/matches.services';

const getAllMatches = async (_req: Request, res: Response) => {
  const matches = await matchesService.getAllMatches();

  return res.status(200).json(matches);
};

const createMatch = async (req: Request, res: Response) => {
  const match = { ...req.body, inProgress: true };

  const createdMatch = await matchesService.createMatch(match);

  return res.status(201).json(createdMatch);
};

export default { getAllMatches, createMatch };
