import { UserEntity } from '../entities/users.entity';
import { PlatformEntity } from '../entities/platform.entity';
export interface UserSession {
  id: number;
  session_key: string;
  user: UserEntity;
  platform: PlatformEntity;
}
