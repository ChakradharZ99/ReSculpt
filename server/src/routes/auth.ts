import { Router } from 'express';
import { forgotPassword, logout, signin, signup, profile, resetPassword } from '../controllers/auth';
import { authMiddleware } from '../middlewares/authMiddleware';

const authRoutes: Router = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.post('/forgotpassword', forgotPassword);
authRoutes.get('/profile', authMiddleware, profile);
authRoutes.post('/resetpassword/:token', authMiddleware, resetPassword);
authRoutes.post('/logout', logout);

export default authRoutes;