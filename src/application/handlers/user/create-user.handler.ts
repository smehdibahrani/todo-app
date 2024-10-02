import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../commands/user.command';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserExistsException } from '../../../exceptions/user.exception';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const existUser = await this.userRepository.findByUsername(
      command.username,
    );
    if (existUser) {
      throw new UserExistsException(command.username);
    }
    const userEntity = new UserEntity('', command.username, command.password);
    return await this.userRepository.create(userEntity);
  }
}
