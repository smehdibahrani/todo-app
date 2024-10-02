import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { GetUserQuery } from '../../queries/user.query';
import { UserExistsException } from '../../../exceptions/user.exception';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(query: GetUserQuery) {
    const existUser = await this.userRepository.findByUsername(query.username);
    if (!existUser) {
      throw new UserExistsException(query.username);
    }
    return existUser;
  }
}
