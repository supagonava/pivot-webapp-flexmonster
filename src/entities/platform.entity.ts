import { Platform } from '@/interfaces/platform.interface';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './users.entity';
import { UserSessionEntity } from './user-session.entity';
import { PivotEntity } from './pivot.entity';

@Entity('platforms')
export class PlatformEntity extends BaseEntity implements Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'user-platforms' })
  users: UserEntity[];

  @OneToMany(() => UserSessionEntity, session => session.platform)
  @JoinColumn({ name: 'session_id' })
  sessions: UserSessionEntity[];

  @OneToMany(() => PivotEntity, pivot => pivot.platform)
  @JoinColumn({ name: 'session_id' })
  pivots: UserSessionEntity[];
}
