import { NextFunction, Request, Response } from 'express';
import { ROOT_DIR } from '@config';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public createPivot = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(`${ROOT_DIR}/public/pages/pivot-create/index.html`);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
