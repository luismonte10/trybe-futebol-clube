import { Router } from 'express';
import matchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', matchesController.getAllMatches);

export default router;
