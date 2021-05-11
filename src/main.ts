import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnifiedResponseInterceptor } from './common/interceptors/unified-response.interceptor';
import { requestIdMiddleware } from './common/middlewares';
import { ConfigIdentifier } from './configuration/constants';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new UnifiedResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.use(requestIdMiddleware(), helmet());

  const configService = app.get(ConfigService);

  const server = configService.get(ConfigIdentifier.Server);

  await app.listen(server.port);

  const logger = app.get(Logger);

  logger.log(`Application is listening on port ${server.port}.`);
}

bootstrap();

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException: ${error}`);
  process.exit(1);
});
