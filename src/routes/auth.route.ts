import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}/user-portal/sign-on`, this.authController.userPortalSignon);
    this.router.post(`${this.path}/generate-session-key`, authMiddleware, this.authController.generateSession);
    this.router.get(`${this.path}/verify-token`, authMiddleware, this.authController.verifyToken);
  }
}

export default AuthRoute;
