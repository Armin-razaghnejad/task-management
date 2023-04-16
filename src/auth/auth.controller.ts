import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('signup')
  async signup() {
    return '';
  }
  @Post('signin')
  async signin() {
    return '';
  }
}
