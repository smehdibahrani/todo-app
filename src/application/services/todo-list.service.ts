import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddItemToTodoListCommand,
  CreateTodoListCommand,
  DeleteTodoListCommand,
  UpdateTodoListCommand,
} from '../commands/todo-list.command';
import { GetUserTodoListsQuery } from '../queries/todo-list.query';

@Injectable()
export class TodoListAppService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(userId: string, title: string) {
    await this.commandBus.execute(new CreateTodoListCommand(userId, title));
  }

  async update(id: string, title: string) {
    await this.commandBus.execute(new UpdateTodoListCommand(id, title));
  }

  async addTodoItemToList(id: string, todoItemId: string) {
    await this.commandBus.execute(new AddItemToTodoListCommand(id, todoItemId));
  }

  async delete(id: string) {
    await this.commandBus.execute(new DeleteTodoListCommand(id));
  }

  async getAllByUser(userId: string) {
    return await this.queryBus.execute(new GetUserTodoListsQuery(userId));
  }
}
