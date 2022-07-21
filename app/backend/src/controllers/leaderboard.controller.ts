import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.services';

const getLeaderboard = async (_req: Request, res: Response) => {
  const leaderboard = await leaderboardService.getLeaderboard();

  return res.status(200).json(leaderboard);
};

export default { getLeaderboard };
