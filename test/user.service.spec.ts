import { UserAppService } from '../src/application/services/user.service';
import { app } from './test.prototype';

describe('UserService', () => {
  let userService: UserAppService;
  let serverAddress: string;

  beforeAll(() => {
    userService = app.userAppService;
    serverAddress = app.getHttpServer();
  });

  beforeEach(() => {});

  it('should add a user', async () => {
    await userService.create('JohnDoe', '123456');
    const user = await userService.getUser('JohnDoe');
    expect(user).toHaveProperty('id');
    expect(user.username).toBe('JohnDoe');
  });

  // it('should retrieve all users', () => {
  //   userService.addUser('JohnDoe');
  //   userService.addUser('JaneDoe');
  //   expect(userService.getUsers()).toHaveLength(2);
  // });
});
