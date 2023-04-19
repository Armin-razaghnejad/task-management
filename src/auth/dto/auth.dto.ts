import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SigninDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
