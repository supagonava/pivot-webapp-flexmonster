import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

import PivotController from '@/controllers/pivot.controller';
import authMiddleware from '../middlewares/auth.middleware';

class PivotRoute implements Routes {
  public path = '/pivot';
  public router = Router();
  public controller = new PivotController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.controller.list, this.controller.edit);
    this.router.put(`${this.path}/:session_key`, authMiddleware, this.controller.update);
  }
}

export default PivotRoute;
