import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'libs/db/src/entities/users.entity';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Users])],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
