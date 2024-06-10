import { NextFunction, Response } from 'express';
import { ALLOWAPP } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { logger } from '@/utils/logger';
import UserPortalService from '@/services/user-portal.service';
import { UserEntity } from '@/entities/users.entity';
import { UserSessionEntity } from '@/entities/user-session.entity';
import { PlatformEntity } from '@/entities/platform.entity';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    // if user portal application
    if (req.headers['authorization']) {
      const decoded = UserPortalService.decodeJWTToken(req.headers['authorization'].toString().replace('Bearer ', ''));
      if (decoded) {
        // find user
        let user = await UserEntity.findOne({ where: { user_id: decoded['userId'] } });
        if (!user) {
          user = await UserEntity.create({ user_id: decoded['userId'] }).save();
        }

        // find platform
        let platform = await PlatformEntity.findOne({ where: { name: decoded['clientId'] } });
        if (!platform) {
          platform = await PlatformEntity.create({ name: decoded['clientId'] }).save();
        }

        const userHasPermissionPlatform = await PlatformEntity.find({ relations: { users: true }, where: { users: { id: user.id } } });

        if (userHasPermissionPlatform.length === 0) {
          user.platforms = [platform];
        } else if (!userHasPermissionPlatform.includes(platform)) {
          user.platforms = [...userHasPermissionPlatform, platform];
        }
        user.save();

        req.user = user;
        req.platform = platform;
        return next();
      } else {
        return res.status(401).send('Your Token Is Not Correct!');
      }
    }

    // if not in user portal
    // check app
    if (ALLOWAPP[`${req.headers['app-name']}`] && ALLOWAPP[`${req.headers['app-name']}`]['key'] === req.headers['app-key'] && req.headers['user-application-uid']) {
      let user = await UserEntity.findOne({ where: { user_id: req.headers['user-application-uid'].toString() } });
      if (!user) {
        user = await UserEntity.create({ user_id: req.headers['user-application-uid'].toString() }).save();
      }

      // find platform
      let platform = await PlatformEntity.findOne({ where: { name: `${req.headers['app-name']}` } });
      if (!platform) {
        platform = await PlatformEntity.create({ name: `${req.headers['app-name']}` }).save();
      }

      const userHasPermissionPlatform = await PlatformEntity.find({ relations: { users: true }, where: { users: { id: user.id } } });

      if (userHasPermissionPlatform.length === 0) {
        user.platforms = [platform];
      } else if (!userHasPermissionPlatform.includes(platform)) {
        user.platforms = [...userHasPermissionPlatform, platform];
      }
      user.save();

      req.user = user;
      req.platform = platform;
      return next();
    } else if (ALLOWAPP[`${req.headers['app-name']}`]) {
      return res.status(401).send('Your Application Has No Access To This Application\nPlease Contact Developer -> supakore@scg.com!');
    }

    // if has session key
    const sessionKey = req.headers['session-key'] ?? req.params['session_key'] ?? (req.query ? req.query.session_key : null);
    if (sessionKey) {
      await UserSessionEntity.delete({ old_session_key: sessionKey.toString() });
      const session = await UserSessionEntity.findOne({
        where: { session_key: `${sessionKey}` },
        relations: {
          pivot: true,
          platform: true,
          user: true,
        },
      });
      if (session) {
        req.user = session.user;
        req.session = session;
        return next();
      } else {
        return res.status(401).send('Session Key Not Correct!');
      }
    }
    res.status(401).send('Unauthorized');
  } catch (error) {
    logger.error(error);
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
