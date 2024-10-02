import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { LoginQuery } from '../../queries/user.query';
import { UserExistsException } from '../../../exceptions/user.exception';

@QueryHandler(LoginQuery)
export class LoginUserHandler implements IQueryHandler<LoginQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(query: LoginQuery) {
    const existUser = await this.userRepository.findByUsernameAndPassword(
      query.username,
      query.password,
    );
    if (!existUser) {
      throw new UserExistsException(query.username);
    }
    return existUser;
  }
}
