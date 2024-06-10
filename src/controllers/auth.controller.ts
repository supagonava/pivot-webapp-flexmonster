import { APP_URL } from '@/config';
// import { logger } from '@/utils/logger';
// import UserPortalService from '../services/user-portal.service';
// import { encryptWithAES } from '@/utils/util';
import { randomUUID } from 'crypto';
import { NextFunction, Response } from 'express';
import { PlatformEntity } from '../entities/platform.entity';
import { UserEntity } from '../entities/users.entity';
import { UserSessionEntity } from '../entities/user-session.entity';
import { PivotEntity } from '../entities/pivot.entity';
import { RequestWithUser } from '@interfaces/auth.interface';

class AuthController {
  // public async userPortalSignon(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { code } = req.query;
  //     // res.json(req.query);

  //     const authenticated = await UserPortalService.getTokenBySessionCode(code.toString());
  //     if (authenticated.status) {
  //       const decoded = UserPortalService.decodeJWTToken(authenticated.data.access_token);
  //       // res.json(decoded);

  //       return res.json({
  //         authenticated: authenticated,
  //         user: decoded,
  //       });
  //     } else {
  //       return res.status(401).send('Fail to signin');
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  public async generateSession(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const { pivot: pivotPayload } = data;

      // find platform
      const platform = req.platform;
      const user = await UserEntity.findOne({ where: { id: req.user.id } });
      const sessionKey = `${randomUUID()}-${randomUUID()}`;

      let pivot: PivotEntity = null;

      if (pivotPayload.id) {
        // query pivot
        pivot = await PivotEntity.findOne({
          relations: { created_user: true },
          where: {
            id: pivotPayload.id,
            created_user: { user_id: user.user_id },
          },
        });
        if (!pivot) res.status(404).send(`Pivot Not Found`);
      } else {
        // create pivot
        pivot = new PivotEntity();
        pivot.pivot_name = pivotPayload.name;
        pivot.endpoint_url = pivotPayload.endpoint_url;
        pivot.endpoint_method = pivotPayload.endpoint_method ?? 'GET';
        pivot.endpoint_headers = pivotPayload.endpoint_headers ? JSON.stringify(pivotPayload.endpoint_headers) : '{}';
        pivot.endpoint_payloads = pivotPayload.endpoint_payloads ? JSON.stringify(pivotPayload.endpoint_payloads) : '{}';
        pivot.endpoint_response_mapper = pivotPayload.endpoint_response_mapper ?? pivotPayload.endpoint_response_mapper;
        pivot.platform = platform;
        pivot.created_user = user;
        await pivot.save();
      }
      const userSession = await UserSessionEntity.create({ session_key: sessionKey, user: user, platform: platform, pivot: pivot }).save();

      return res.json({ status: 'success', session_key: userSession.session_key, redirect_url: APP_URL + '/pivot?session_key=' + userSession.session_key });
    } catch (error) {
      next(error);
    }
  }
  public async verifyToken(req: RequestWithUser, res: Response, next: NextFunction) {
    const user: UserEntity = await UserEntity.findOne({ relations: { platforms: true }, where: { id: req.user.id } });
    return res.json(user);
  }
}

export default AuthController;
