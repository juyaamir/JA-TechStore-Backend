import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());

//Routes
app.use('/api/auth', userRouter);
app.get('/',(req, res) => {
    res.send('Hello from Express!');
});


export default app;