import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../../commands/todo-list.command';
import { TodoListRepository } from '../../../infrastructure/persistence/todo-list.repository';
import { TodoListEntity } from '../../../domain/entities/todo-list.entity';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(private todoListRepository: TodoListRepository) {}

  async execute(command: CreateTodoListCommand) {
    const todoList = new TodoListEntity('', command.userId, command.title, []);
    await this.todoListRepository.create(todoList);
  }
}
