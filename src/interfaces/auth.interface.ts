import { Request } from 'express';
import { User } from '@interfaces/users.interface';
import { UserSessionEntity } from '../entities/user-session.entity';
import { PlatformEntity } from '../entities/platform.entity';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
  session?: UserSessionEntity;
  platform?: PlatformEntity;
}
