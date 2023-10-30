import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';

class Relations {
  @ManyToOne(() => User, (e) => e.auths, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

@Entity()
export class Auth extends Relations {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK' })
  readonly id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 400,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
