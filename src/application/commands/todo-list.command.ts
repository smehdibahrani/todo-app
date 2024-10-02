export class CreateTodoListCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
  ) {}
}

export class UpdateTodoListCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
  ) {}
}

export class AddItemToTodoListCommand {
  constructor(
    public readonly id: string,
    public readonly todoItemId: string,
  ) {}
}

export class DeleteTodoListCommand {
  constructor(public readonly id: string) {}
}
