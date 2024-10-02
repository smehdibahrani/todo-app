import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddItemToTodoListCommand } from '../../commands/todo-list.command';
import { TodoListRepository } from '../../../infrastructure/persistence/todo-list.repository';

@CommandHandler(AddItemToTodoListCommand)
export class AddItemToTodoListHandler
  implements ICommandHandler<AddItemToTodoListCommand>
{
  constructor(private todoListRepository: TodoListRepository) {}

  async execute(command: AddItemToTodoListCommand) {
    await this.todoListRepository.updateAddItemToTodoList(
      command.id,
      command.todoItemId,
    );
  }
}
