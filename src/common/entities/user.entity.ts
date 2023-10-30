import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Auth } from './auth.entity';

class Relations {
  @OneToMany(() => Auth, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinTable()
  auths: Auth[];
}

@Entity()
export class User extends Relations {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK' })
  readonly id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
