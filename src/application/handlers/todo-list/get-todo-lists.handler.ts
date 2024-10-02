import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoListRepository } from '../../../infrastructure/persistence/todo-list.repository';
import { GetUserTodoListsQuery } from '../../queries/todo-list.query';

@QueryHandler(GetUserTodoListsQuery)
export class GetToDoListsHandler
  implements IQueryHandler<GetUserTodoListsQuery>
{
  constructor(private todoListRepository: TodoListRepository) {}

  async execute(query: GetUserTodoListsQuery) {
    return await this.todoListRepository.findAllByUser(query.userId);
  }
}
