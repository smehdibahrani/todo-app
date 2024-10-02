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
import { DeleteUserHandler } from '../src/application/handlers/user/delete-user.handler';

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
    providers: [CreateUserHandler, DeleteUserHandler, UserRepository],
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

afterEach(async () => {});

afterAll(async () => {
  await app.close();
});

export { app };
