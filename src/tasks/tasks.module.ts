import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from 'libs/db/src/entities/tasks.entity';
import { Users } from 'libs/db/src/entities/users.entity';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([Tasks, Users])],
})
export class TasksModule {}
