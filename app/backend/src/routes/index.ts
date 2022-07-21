import { Router } from 'express';
import login from './login.routes';
import teams from './teams.routes';
import matches from './matches.routes';
import leaderboardHome from './leaderboard.routes';

const router = Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);
router.use('/leaderboard', leaderboardHome);

export default router;
