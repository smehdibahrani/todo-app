import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoItemController } from './todo-item.controller';
import { UserController } from './user.controller';
import { UpdateTodoItemHandler } from '../../application/handlers/todo-item/update-todo-item.handler';
import { CreateUserHandler } from '../../application/handlers/user/create-user.handler';
import { RepositoryModule } from '../../infrastructure/persistence/repository.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AppServiceModule } from '../../application/services/app-service.module';
import { LoginUserHandler } from '../../application/handlers/user/login-user.handler';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CreateTodoListHandler } from '../../application/handlers/todo-list/create-todo-list.handler';
import { GetUserHandler } from '../../application/handlers/user/get-user.handler';
import { TodoListController } from './todo-list.controller';
import { UpdateTodoListHandler } from '../../application/handlers/todo-list/update-todo-list.handler';
import { GetToDoListsHandler } from '../../application/handlers/todo-list/get-todo-lists.handler';
import { DeleteTodoListHandler } from '../../application/handlers/todo-list/delete-todo-list.handler';
import { CreateTodoItemHandler } from '../../application/handlers/todo-item/create-todo-item.handler';
import { DeleteTodoItemHandler } from '../../application/handlers/todo-item/delete-todo-item.handler';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { GetOneTodoListsHandler } from '../../application/handlers/todo-list/get-one-todo-list.handler';
import { AddItemToTodoListHandler } from '../../application/handlers/todo-list/add-item-to-todo-list.handler';

@Module({
  imports: [
    RepositoryModule,
    CqrsModule,
    AppServiceModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [TodoItemController, UserController, TodoListController],
  providers: [
    EventEmitter2,
    CreateUserHandler,
    LoginUserHandler,
    GetUserHandler,
    CreateTodoListHandler,
    UpdateTodoListHandler,
    DeleteTodoListHandler,
    GetToDoListsHandler,
    UpdateTodoItemHandler,
    CreateTodoItemHandler,
    DeleteTodoItemHandler,
    GetOneTodoListsHandler,
    AddItemToTodoListHandler,
  ],
})
export class ControllerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .exclude('/users/login', '/users')
      .forRoutes('*');
  }
}
