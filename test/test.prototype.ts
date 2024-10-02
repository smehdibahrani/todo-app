import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '../src/infrastructure/persistence/schema/user.schema';
import {
  TodoList,
  TodoListSchema,
} from '../src/infrastructure/persistence/schema/todo-list.schema';
import {
  TodoItem,
  TodoItemSchema,
} from '../src/infrastructure/persistence/schema/todo-item.schema';
import { CreateUserHandler } from '../src/application/handlers/user/create-user.handler';
import { UserRepository } from '../src/infrastructure/persistence/user.repository';
import { UserAppService } from '../src/application/services/user.service';
import { AppModule } from '../src/app.module';

let app: INestApplication & {
  userAppService: UserAppService;
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
      MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: TodoList.name, schema: TodoListSchema },
        { name: TodoItem.name, schema: TodoItemSchema },
      ]),
    ],
    providers: [CreateUserHandler, UserRepository],
  }).compile();

  app = module.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.userAppService = module.get(UserAppService);
  await app.init();
});

beforeEach(async () => {
  //  app.userAppService = app.get(UserAppService);
});

afterEach(async () => {
  //await connection.db.collections['User'].drop();
});

afterAll(async () => {
  //await connection.db.dropCollection('User');
  await app.close();
});

export { app };
