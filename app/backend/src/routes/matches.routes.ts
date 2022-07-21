import { Router } from 'express';
import authToken from '../middlewares/authToken';
import validateMatches from '../middlewares/matches.middleware';
import matchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', matchesController.getAllMatches);
router.post('/', authToken, validateMatches, matchesController.createMatch);
router.patch('/:id/finish', matchesController.finishMatch);
router.patch('/:id', matchesController.updateMatch);

export default router;
