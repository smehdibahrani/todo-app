export class CreateTodoItemCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly priority: number,
  ) {}
}

export class UpdateTodoItemCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly priority: number,
  ) {}
}

export class DeleteTodoItemCommand {
  constructor(public readonly id: string) {}
}
