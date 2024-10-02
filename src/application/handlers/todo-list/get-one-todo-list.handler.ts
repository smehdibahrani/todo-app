import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoListRepository } from '../../../infrastructure/persistence/todo-list.repository';
import { GetOneTodoListQuery } from '../../queries/todo-list.query';

@QueryHandler(GetOneTodoListQuery)
export class GetOneTodoListsHandler
  implements IQueryHandler<GetOneTodoListQuery>
{
  constructor(private todoListRepository: TodoListRepository) {}

  async execute(query: GetOneTodoListQuery) {
    return await this.todoListRepository.findById(query.id);
  }
}
