import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../../commands/todo-list.command';
import { TodoListRepository } from '../../../infrastructure/persistence/todo-list.repository';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(private todoListRepository: TodoListRepository) {}

  async execute(command: UpdateTodoListCommand) {
    await this.todoListRepository.update(command.id, { title: command.title });
  }
}
