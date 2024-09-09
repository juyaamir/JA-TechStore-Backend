import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

//create a new router instance
const userRouter = express.Router();

//Route to handle user registration
userRouter.post(`/register`, registerUser);

//Route to handle user login
userRouter.post(`/login`, loginUser);

//Export the router to be used in other parts of the application
export default userRouter;