import { Request, Response } from 'express';
import matchesService from '../services/matches.services';

const getAllMatches = async (_req: Request, res: Response) => {
  const matches = await matchesService.getAllMatches();

  return res.status(200).json(matches);
};

export default { getAllMatches };
