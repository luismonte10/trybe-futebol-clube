import { Router } from 'express';
import { validateEmail, validatePassword } from '../middlewares/login.middleware';
import login from '../controllers/users.controller';

const router = Router();

router.post('/', validateEmail, validatePassword, login);

export default router;
