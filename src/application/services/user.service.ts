import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand, DeleteUserCommand } from '../commands/user.command';
import { GetUserQuery, LoginQuery } from '../queries/user.query';
import { AuthService } from './auth.service';
import { PasswordIncorrectException } from '../../exceptions/user.exception';

@Injectable()
export class UserAppService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private authService: AuthService,
  ) {}

  async create(username: string, password: string) {
    return await this.commandBus.execute(
      new CreateUserCommand(username, password),
    );
  }

  async login(username: string, password: string) {
    const { passwordValid, user } = await this.queryBus.execute(
      new LoginQuery(username, password),
    );
    if (!passwordValid) {
      throw new PasswordIncorrectException(password);
    }
    const accessToken = this.authService.sign({ username });

    return { ...user, accessToken };
  }

  async getUser(username: string) {
    return await this.queryBus.execute(new GetUserQuery(username));
  }

  async delete(username: string) {
    return await this.commandBus.execute(new DeleteUserCommand(username));
  }
}
