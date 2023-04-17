import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @HttpCode(HttpStatus.FORBIDDEN)
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    this.service.signup(dto);
  }
  @Post('signin')
  async signin() {
    return '';
  }
}
