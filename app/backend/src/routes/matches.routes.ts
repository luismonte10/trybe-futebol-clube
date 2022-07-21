import { Router } from 'express';
import authToken from '../middlewares/authToken';
import matchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', matchesController.getAllMatches);
router.post('/', authToken, matchesController.createMatch);

export default router;
