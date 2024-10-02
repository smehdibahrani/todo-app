import { TodoItemEntity } from './todo-item.entity';

export class TodoListEntity {
  constructor(
    public readonly id: string,
    public userId: string,
    public title: string,
    public todoItems: TodoItemEntity[],
  ) {}
}
