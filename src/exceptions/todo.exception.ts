import { HttpException, HttpStatus } from '@nestjs/common';

export class TodoException extends HttpException {
  constructor(id: string) {
    super(`Todo with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
