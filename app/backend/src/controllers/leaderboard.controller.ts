import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.services';

const getLeaderboardHome = async (_req: Request, res: Response) => {
  const leaderboardHome = await leaderboardService.getLeaderboardHome();

  return res.status(200).json(leaderboardHome);
};

export default { getLeaderboardHome };
