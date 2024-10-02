export class GetUserTodoListsQuery {
  constructor(public userId: string) {}
}

export class GetOneTodoListQuery {
  constructor(public id: string) {}
}
