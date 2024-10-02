export class TodoItemEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public priority: number = 0,
    public todoList: TouchList = null,
  ) {}
}
