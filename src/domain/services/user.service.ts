import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDomainService {
  // Domain logic can be placed here.

  // For example, if you have rules for generating IDs or more complex business logic.
  validateTodoTitle(title: string) {
    if (!title || title.length < 3) {
      throw new Error('The title needs to be at least 3 characters long.');
    }
    return true;
  }
}
