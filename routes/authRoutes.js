import express from 'express';
import { registerUser } from '../controllers/authController.js';

const userRouter = express.Router();
userRouter.post(`/register`, registerUser);
export default userRouter;
