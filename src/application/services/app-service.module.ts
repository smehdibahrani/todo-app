import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserAppService } from './user.service';
import { AuthService } from './auth.service';
import { EnvironmentConfigModule } from '../config/environment_config.module';
import { JwtModule } from '@nestjs/jwt';
import { TodoItemAppService } from './todo-item.service';
import { TodoListAppService } from './todo-list.service';

@Module({
  imports: [CqrsModule, EnvironmentConfigModule, JwtModule],
  providers: [
    UserAppService,
    TodoItemAppService,
    TodoListAppService,
    AuthService,
  ],
  exports: [
    UserAppService,
    TodoItemAppService,
    TodoListAppService,
    AuthService,
  ],
})
export class AppServiceModule {}
