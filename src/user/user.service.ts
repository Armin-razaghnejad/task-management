import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'libs/db/src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private user: Repository<Users>) {}
  async findAll() {
    return this.user.find({
      select: {
        username: true,
        id: true,
      },
    });
  }
}
