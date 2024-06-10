import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import DataController from '../controllers/data.controller';

class DateRoute implements Routes {
  public path = '/data';
  public router = Router();
  public dataController = new DataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/demo`, this.dataController.demo);
  }
}

export default DateRoute;
