export class LoginQuery {
  constructor(
    public username: string,
    public password: string,
  ) {}
}

export class GetUserQuery {
  constructor(public username: string) {}
}
