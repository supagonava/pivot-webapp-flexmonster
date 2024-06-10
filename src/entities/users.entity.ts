import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { PlatformEntity } from './platform.entity';
import { UserSessionEntity } from './user-session.entity';
import { PivotEntity } from './pivot.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['user_id'])
  user_id: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => PlatformEntity)
  @JoinTable({ name: 'user-platforms' })
  platforms: PlatformEntity[];

  @OneToMany(() => UserSessionEntity, userSessionEntity => userSessionEntity.user)
  sessions: UserSessionEntity[];

  @OneToMany(() => PivotEntity, pivotEntity => pivotEntity.created_user)
  pivots: UserSessionEntity[];
}
