import { UserAppService } from '../src/application/services/user.service';
import { app } from './test.prototype';

describe('UserService', () => {
  let userService: UserAppService;

  beforeAll(() => {
    userService = app.userAppService;
  });

  it('should add a user', async () => {
    const user = await userService.create('mehdi', '123456');
    expect(user).toHaveProperty('id');
    expect(user.username).toBe('mehdi');

    await userService.delete(user.username);
  });
});
