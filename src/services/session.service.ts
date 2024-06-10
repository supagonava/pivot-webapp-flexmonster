import { randomUUID } from 'crypto';
import { UserSessionEntity } from '../entities/user-session.entity';
class SessionService {
  static rotateSessionKey = async (session: UserSessionEntity): Promise<UserSessionEntity> => {
    session.old_session_key = session.session_key;
    session.session_key = `${randomUUID()}-${randomUUID()}`;
    await session.save();
    return session;
  };
}
export default SessionService;
