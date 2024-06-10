import { Pivot } from '@/interfaces/pitvot.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PlatformEntity } from './platform.entity';
import { UserEntity } from './users.entity';
import { UserSessionEntity } from './user-session.entity';

@Entity('pivots')
export class PivotEntity extends BaseEntity implements Pivot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  pivot_name: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  endpoint_url: string;

  @Column({ length: 5 })
  endpoint_method: 'POST' | 'GET';

  @Column({ type: 'text' })
  endpoint_headers: string;

  @Column({ type: 'text' })
  endpoint_payloads: string;

  @Column({ length: 100 })
  endpoint_response_mapper: string;

  @Column({ type: 'text', nullable: true })
  pivot_config: string;

  @Column({ nullable: false, default: true })
  editable: boolean;

  @ManyToOne(() => UserEntity, user => user.pivots)
  @JoinColumn({ name: 'created_user_id' })
  created_user: UserEntity;

  @ManyToOne(() => PlatformEntity, platform => platform.pivots)
  platform: PlatformEntity;

  @OneToMany(() => UserSessionEntity, session => session.pivot)
  sessions: UserSessionEntity[];
}
