import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTodoItemCommand,
  DeleteTodoItemCommand,
  UpdateTodoItemCommand,
} from '../commands/todo-item.command';
import { GetUserTodoListsQuery } from '../queries/todo-list.query';
import { TodoListAppService } from './todo-list.service';

@Injectable()
export class TodoItemAppService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly todoListAppService: TodoListAppService,
  ) {}

  async create(
    todoListId: string,
    title: string,
    description: string,
    priority: number,
  ) {
    const todoItem = await this.commandBus.execute(
      new CreateTodoItemCommand(title, description, priority),
    );
    await this.todoListAppService.addTodoItemToList(todoListId, todoItem.id);
  }

  async update(
    id: string,
    title: string,
    description: string,
    priority: number,
  ) {
    await this.commandBus.execute(
      new UpdateTodoItemCommand(id, title, description, priority),
    );
  }

  async delete(id: string) {
    await this.commandBus.execute(new DeleteTodoItemCommand(id));
  }

  async getAllByUser(userId: string) {
    return await this.queryBus.execute(new GetUserTodoListsQuery(userId));
  }
}
