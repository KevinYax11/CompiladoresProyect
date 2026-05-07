import express from 'express';
import cors from 'cors';
import { compilerRoutes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', compilerRoutes);

export default app;