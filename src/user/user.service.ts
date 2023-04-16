import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'libs/db/src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private users: Repository<Users>) {}
  async adduser() {
    const newuser = this.users.create({
      email: 'test@email',
      password: '123',
      username: 'armin razagh',
    });
    try {
      await this.users.save(newuser);
      return newuser;
    } catch (error) {
      return error;
    }
  }
}
