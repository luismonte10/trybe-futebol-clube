import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/', leaderboardController.getLeaderboard);
router.get('/home', leaderboardController.getLeaderboardHome);
router.get('/away', leaderboardController.getLeaderboardAway);

export default router;
