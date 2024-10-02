import { app } from './test.prototype';
import * as request from 'supertest';
import { UserAppService } from '../src/application/services/user.service';

describe('UserService', () => {
  let serverAddress: string;
  let userService: UserAppService;
  beforeAll(() => {
    userService = app.userAppService;
    serverAddress = app.getHttpServer();
  });

  it('should add create user with api', async () => {
    await request(serverAddress)
      .post('/users')
      .send({
        username: 'ali',
        password: 123456,
      })
      .expect(201);

    await userService.delete('ali');
  });

  it('should add login user with api', async () => {
    const user = await userService.create('amin', '123456');
    const response = await request(serverAddress)
      .post('/users/login')
      .send({
        username: user.username,
        password: '123456',
      })
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body.username).toBe(user.username);

    await userService.delete(user.username);
  });
});
