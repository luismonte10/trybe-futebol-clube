import { Request, Response } from 'express';
import matchesService from '../services/matches.services';

const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  const matches = await matchesService.getAllMatches(inProgress?.toString());

  return res.status(200).json(matches);
};

const createMatch = async (req: Request, res: Response) => {
  const match = { ...req.body, inProgress: true };

  const createdMatch = await matchesService.createMatch(match);

  return res.status(201).json(createdMatch);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  await matchesService.finishMatch(Number(id));

  return res.status(200).json({ message: 'Finished' });
};

const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  const updatedMatch = await matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

  return res.status(200).json(updatedMatch);
};

export default { getAllMatches, createMatch, finishMatch, updateMatch };
