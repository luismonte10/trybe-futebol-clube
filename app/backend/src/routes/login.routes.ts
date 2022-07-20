import { Router } from 'express';
import { validateEmail, validatePassword } from '../middlewares/login.middleware';
import userController from '../controllers/users.controller';

const router = Router();

router.post('/', validateEmail, validatePassword, userController.login);
router.get('/validate', userController.validateToken);

export default router;sr
