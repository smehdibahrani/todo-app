import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(username: string) {
    super(
      `User with username: ${username} not found!`,
      HttpStatus.NOT_FOUND,
      {},
    );
  }
}

export class UserExistsException extends HttpException {
  constructor(username: string) {
    super(`User with username: ${username} exists!`, HttpStatus.CONFLICT, {});
  }
}

export class PasswordIncorrectException extends HttpException {
  constructor(password: string) {
    super(`password ${password} incorrect!`, HttpStatus.FORBIDDEN, {});
  }
}
