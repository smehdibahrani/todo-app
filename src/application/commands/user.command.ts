export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}

export class DeleteUserCommand {
  constructor(public readonly username: string) {}
}
