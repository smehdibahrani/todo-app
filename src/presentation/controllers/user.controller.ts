import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../../application/dto/user.dto';
import { UserAppService } from '../../application/services/user.service';

@Controller('users')
export class UserController {
  constructor(private userAppService: UserAppService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    await this.userAppService.create(dto.username, dto.password);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.userAppService.login(dto.username, dto.password);
  }
}
