import { USER_PORTAL_URL } from '@/config';
import { logger } from '@/utils/logger';
import axios from 'axios';
import JWT from 'jsonwebtoken';
import { USER_PORTAL_PUBLIC_KEY } from '../config/index';

class UserPortalService {
  static decodeJWTToken = (token: string) => {
    try {
      return JWT.verify(token, USER_PORTAL_PUBLIC_KEY);
    } catch (error) {
      console.log(`${error}`);
      return null;
    }
  };

  static getTokenBySessionCode = async (code: string) => {
    const endpoint = USER_PORTAL_URL + '/api-user-portal/api/Auth/Token';
    logger.info(`generate token for => ${code}, endpoint => ${endpoint}`);
    try {
      const form = new URLSearchParams();
      form.append('grant_type', 'authorization_code');
      form.append('code', code);
      logger.debug(JSON.stringify(form));
      const authResponse = await axios.post(endpoint, form);

      return { status: true, data: authResponse.data };
    } catch (error: any) {
      return { status: false, error: error };
    }
  };

  static getProfile = async (token: string) => {
    const response = await axios.get('https://test-user-portal.scglogistics.co.th/api-user-portal/api/user/getprofile', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const responseData = response.data.data;
    logger.debug(`${UserPortalService.name} ${UserPortalService.getProfile.name} => ${JSON.stringify(responseData)}`);
    return responseData;
  };
}

export default UserPortalService;
