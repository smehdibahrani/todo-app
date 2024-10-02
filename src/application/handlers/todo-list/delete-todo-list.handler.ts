import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from '../../commands/todo-list.command';
import { TodoListRepository } from '../../../infrastructure/persistence/todo-list.repository';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(private todoListRepository: TodoListRepository) {}

  async execute(command: DeleteTodoListCommand) {
    await this.todoListRepository.delete(command.id);
  }
}
