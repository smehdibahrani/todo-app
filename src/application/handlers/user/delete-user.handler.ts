import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../../commands/user.command';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand) {
    await this.userRepository.deleteByUsername(command.username);
  }
}
