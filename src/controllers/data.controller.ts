import { NextFunction, Request, Response } from 'express';
import set1 from '@/config/demo-1.json';
import set2 from '@/config/demo-2.json';
import set3 from '@/config/demo-3.json';

class DataController {
  public demo(req: Request, res: Response, next: NextFunction) {
    try {
      const headers = req.headers;
      const body = req.body;
      if (headers['authorization'] === 'Bearer token1234') {
        return res.status(200).json({ data: !body.dataset ? set1 : body.dataset === 1 ? set1 : body.dataset === 2 ? set2 : set3 });
      }
      return res.status(401).send('Unauthorize');
    } catch (error) {
      next(error);
    }
  }
}
export default DataController;
