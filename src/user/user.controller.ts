import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators';
import { Users } from 'libs/db/src/entities/users.entity';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Get('me')
  getMe(@GetUser() user: Users) {
    return user;
  }

  @Get('all')
  getUsers() {
    return this.service.findAll();
  }
}
