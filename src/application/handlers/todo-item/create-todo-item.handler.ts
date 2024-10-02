import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TodoItemEntity } from '../../../domain/entities/todo-item.entity';
import { TodoItemRepository } from '../../../infrastructure/persistence/todo-item.repository';
import { CreateTodoItemCommand } from '../../commands/todo-item.command';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(private todoItemRepository: TodoItemRepository) {}

  async execute(command: CreateTodoItemCommand) {
    const todo = new TodoItemEntity(
      '',
      command.title,
      command.description,
      command.priority,
    );
    return await this.todoItemRepository.create(todo);
  }
}
