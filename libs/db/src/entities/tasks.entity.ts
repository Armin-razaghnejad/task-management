import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskPriorityEnum, TaskStatusEnum } from '../interfaces';
import { Users } from './users.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  description: string;

  @Column({ enum: TaskStatusEnum, default: TaskStatusEnum.open })
  status: TaskStatusEnum;

  @ManyToMany(() => Users, (user) => user.tasks)
  users?: number[];

  @Column({ nullable: true, enum: TaskPriorityEnum })
  priority: TaskPriorityEnum;

  @Column({ default: false })
  done: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
