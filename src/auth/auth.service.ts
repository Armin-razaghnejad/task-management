import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { Users } from 'libs/db/src/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(Users) private user: Repository<Users>,
  ) {}
  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);
    const newuser = this.user.create({
      email: dto.email,
      password: hash,
      username: dto.username,
    });
    try {
      await this.user.save(newuser);
      return newuser;
    } catch (error) {
      return error;
    }
  }

  // async signin() {}

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token,
    };
  }
}
