import express from 'express';
import { registerUser, loginUser, getProfile, getUsers } from '../controllers/authController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleWare.js';

//create a new router instance
const userRouter = express.Router();

//Route to handle user registration
userRouter.post(`/register`, registerUser);

//Route to handle user login
userRouter.post(`/login`, loginUser);

//Route to handle user profile
userRouter.get('/profile', verifyToken, getProfile);

//Route to handle users list
userRouter.get('/users',verifyToken, isAdmin,  getUsers);

//Export the router to be used in other parts of the application
export default userRouter;