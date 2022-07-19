import { Router } from 'express';
import login from './login.routes';

const router = Router();

router.post('/login', login);

export default router;
