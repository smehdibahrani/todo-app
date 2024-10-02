import { TodoListEntity } from './todo-list.entity';

export class UserEntity {
  constructor(
    public readonly id: string,
    public username: string,
    public password: string,
    public todoLists: TodoListEntity[] = [],
  ) {}
}
