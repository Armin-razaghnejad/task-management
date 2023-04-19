import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninDto, SignupDto } from './dto/auth.dto';
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
      return await this.signToken(newuser.id, newuser.email);
    } catch (error) {
      if (error.code && error.code == '23505') {
        throw new ConflictException();
      } else {
        throw error;
      }
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.user.findOneBy({ email: dto.email });
    if (!user) return new ForbiddenException('Credential incorrect');
    const pwMatch = await argon.verify(user.password, dto.password);
    if (!pwMatch) throw new ForbiddenException('Credential incorrect');
    return this.signToken(user.id, user.email);
  }

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
