import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
import { EnvironmentConfigService } from './application/config/environment_config.service';
import { AllExceptionFilter } from './exceptions/exception.filter';
import { LoggerService } from './application/logger/logger.service';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(app.get(LoggerService)));

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // base routing
  app.setGlobalPrefix('api');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addApiKey(
        { type: 'apiKey', name: 'Authorization', in: 'header' },
        'Authorization',
      )
      .setTitle('todo-list')
      .setDescription('api')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('swagger', app, document);
  }

  const environmentConfigService = app.get(EnvironmentConfigService);
  await app.listen(environmentConfigService.getPort());
}

bootstrap();
