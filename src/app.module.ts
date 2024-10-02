import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './application/config/environment_config.module';
import { ControllerModule } from './presentation/controllers/controller.module';
import { LoggerModule } from './application/logger/logger.module';

@Module({
  imports: [EnvironmentConfigModule, ControllerModule, LoggerModule],
})
export class AppModule {}
