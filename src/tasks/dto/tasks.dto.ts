import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { TaskPriorityEnum, TaskStatusEnum } from 'libs/db/src/interfaces';

export class TaskDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: TaskStatusEnum;

  @IsArray()
  @IsOptional()
  userIds: number[];

  @IsEnum(TaskPriorityEnum)
  @IsOptional()
  priority: TaskPriorityEnum;

  @IsBoolean()
  @IsOptional()
  done: boolean;
}

export interface TaskQueryInterface {
  assigned: string;
}
