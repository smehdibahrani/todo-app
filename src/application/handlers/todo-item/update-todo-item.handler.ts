import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TodoItemEntity } from '../../../domain/entities/todo-item.entity';
import { TodoItemRepository } from '../../../infrastructure/persistence/todo-item.repository';
import { UpdateTodoItemCommand } from '../../commands/todo-item.command';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(private todoItemRepository: TodoItemRepository) {}

  async execute(command: UpdateTodoItemCommand) {
    const todoItem = new TodoItemEntity(
      '',
      command.title,
      command.description,
      command.priority,
    );
    await this.todoItemRepository.update(command.id, todoItem);
  }
}
