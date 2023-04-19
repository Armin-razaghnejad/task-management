import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'libs/db/src/entities/tasks.entity';
import { Repository, getRepository } from 'typeorm';
import { TaskDto, TaskQueryInterface } from './dto';
import { Users } from 'libs/db/src/entities/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private tasks: Repository<Tasks>,
    @InjectRepository(Users) private users: Repository<Users>,
  ) {
    this.findAll({ assigned: [2] }).then((res) => console.log(res));
  }

  async findAll(query?: TaskQueryInterface) {
    return this.tasks.find();
  }

  async insert(dto: TaskDto) {
    const userIds: Users[] = [];
    if (dto.userIds?.length) {
      for (const id of dto.userIds) {
        const user = await this.users.findOne({
          where: {
            id,
          },
        });
        if (user) userIds.push(user);
      }
    }
    const newtask = this.tasks.create({
      ...dto,
      userIds: dto.userIds,
    });
    try {
      await this.tasks.save(newtask);
      return newtask;
    } catch (error) {
      return error;
    }
  }
}
