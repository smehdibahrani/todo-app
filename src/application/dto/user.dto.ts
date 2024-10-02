import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
