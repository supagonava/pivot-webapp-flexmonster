import { UserSession } from '../interfaces/user-session.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { PlatformEntity } from './platform.entity';
import { PivotEntity } from './pivot.entity';

// UserSession
@Entity('user-sessions')
export class UserSessionEntity extends BaseEntity implements UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  session_key: string;

  @Column({ nullable: true })
  @Index()
  old_session_key: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, user => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PlatformEntity, platform => platform.sessions)
  @JoinColumn({ name: 'platform_id' })
  platform: PlatformEntity;

  @ManyToOne(() => PivotEntity, pivot => pivot.sessions)
  pivot: PivotEntity;
}
