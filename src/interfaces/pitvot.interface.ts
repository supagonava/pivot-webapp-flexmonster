import { UserEntity } from '../entities/users.entity';
import { PlatformEntity } from '../entities/platform.entity';

export interface Pivot {
  id: number;
  pivot_name: string;
  endpoint_url: string;
  endpoint_method: 'POST' | 'GET';
  endpoint_headers: string;
  endpoint_payloads: string;
  endpoint_response_mapper: string;
  pivot_config: string;
  created_user: UserEntity;
  platform: PlatformEntity;
}
