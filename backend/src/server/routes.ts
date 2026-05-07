import { Router } from 'express';
import { compileController } from './controllers/compileController';

export const compilerRoutes = Router();

compilerRoutes.post('/compile', compileController);