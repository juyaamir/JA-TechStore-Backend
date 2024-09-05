import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
app.get('/',(req, res) => {
    res.send('Hello from Express!');
});
app.get('/api', (req, res) => {
    res.json({message: `Hello from API!`})
});

export default app;