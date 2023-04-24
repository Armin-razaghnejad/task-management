import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'libs/db/src/entities/tasks.entity';
import { FindOneOptions, In, Repository } from 'typeorm';
import { TaskDto, TaskQueryInterface } from './dto';
import { Users } from 'libs/db/src/entities/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private tasks: Repository<Tasks>,
    @InjectRepository(Users) private users: Repository<Users>,
  ) {}

  async findAll(query?: string[]) {
    let queryBuilder: FindOneOptions<Tasks>;
    if (query)
      queryBuilder = {
        where: {
          users: {
            id: In(query),
          },
        },
      };
    return this.tasks.findAndCount({
      relations: {
        users: true,
      },
      ...queryBuilder,
    });
  }

  async insert(dto: TaskDto) {
    let users: Users[] = [];
    if (dto.userIds?.length)
      users = await this.users.find({
        where: {
          id: In(dto.userIds),
        },
      });

    const newtask = this.tasks.create({
      ...dto,
      users: users,
    });
    try {
      await this.tasks.save(newtask);
      return newtask;
    } catch (error) {
      return error;
    }
  }
}
