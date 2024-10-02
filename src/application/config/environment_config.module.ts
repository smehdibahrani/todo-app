import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './load_environment_config';
import { EnvironmentConfigService } from './environment_config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
