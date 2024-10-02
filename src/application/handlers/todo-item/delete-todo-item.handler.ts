import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from '../../commands/todo-item.command';
import { TodoItemRepository } from '../../../infrastructure/persistence/todo-item.repository';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(private todoItemRepository: TodoItemRepository) {}

  async execute(command: DeleteTodoItemCommand) {
    await this.todoItemRepository.delete(command.id);
  }
}
