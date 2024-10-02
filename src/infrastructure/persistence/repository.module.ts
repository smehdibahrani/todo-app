import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItem, TodoItemSchema } from './schema/todo-item.schema';
import { TodoList, TodoListSchema } from './schema/todo-list.schema';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { TodoListRepository } from './todo-list.repository';
import { TodoItemRepository } from './todo-item.repository';
import { EnvironmentConfigModule } from '../../application/config/environment_config.module';
import { EnvironmentConfigService } from '../../application/config/environment_config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: EnvironmentConfigService) => ({
        uri: configService.getMongoUrlConfig(),
      }),
      inject: [EnvironmentConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: TodoList.name, schema: TodoListSchema },
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
  ],
  providers: [UserRepository, TodoListRepository, TodoItemRepository],
  exports: [UserRepository, TodoListRepository, TodoItemRepository],
})
export class RepositoryModule {}
