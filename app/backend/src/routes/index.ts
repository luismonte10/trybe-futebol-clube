import { Router } from 'express';
import login from './login.routes';
import teams from './teams.routes';

const router = Router();

router.use('/login', login);
router.use('/teams', teams);

export default router;
