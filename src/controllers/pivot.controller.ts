import { NextFunction, Response } from 'express';
import { UserSessionEntity } from '../entities/user-session.entity';
import fs from 'fs';
import { PivotEntity } from '@/entities/pivot.entity';
import { APP_URL } from '../config/index';
import { RequestWithUser } from '../interfaces/auth.interface';
import SessionService from '@/services/session.service';

class PivotController {
  public async list(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (req.session) {
        return next();
      }
      let rows: any[] = await PivotEntity.find({
        relations: { platform: true },
        where: { created_user: { user_id: req.user.user_id } },
        select: {
          id: true,
          endpoint_payloads: true,
          pivot_name: true,
          created_at: true,
          updated_at: true,
          platform: {
            name: true,
          },
        },
      });
      rows = rows.map(row => {
        return { ...row, endpoint_payloads: row.endpoint_payloads ? JSON.parse(row.endpoint_payloads) : null };
      });
      res.json({ status: true, total: rows.length, data: rows });
    } catch (error) {
      next(error);
    }
  }

  public async edit(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const session = req.session;
      // await SessionService.rotateSessionKey(session);

      let html = fs.readFileSync(__dirname.replaceAll('/src/controllers', '/public/pages/pivot-setup.html'), 'utf8');
      const embedData = JSON.stringify(session);
      html = html.replaceAll('const session = {};', 'const session = ' + embedData + ';');
      html = html.replaceAll('%APP_URL%', APP_URL);
      return res.send(html);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const session = await UserSessionEntity.findOne({ relations: { pivot: true }, where: { session_key: req.params['session_key'] } });

      const pivot: PivotEntity = session.pivot;
      pivot.pivot_config = JSON.stringify(data);
      pivot.editable = false;
      await pivot.save();

      await session.remove();

      return res.status(202).send('Saved');
    } catch (error) {
      next(error);
    }
  }
}
export default PivotController;
