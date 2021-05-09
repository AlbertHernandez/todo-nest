import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnifiedResponseInterceptor } from './common/interceptors/unified-response.interceptor';
import { requestIdMiddleware } from './common/middlewares';
import { ConfigIdentifier } from './configuration/constants';
import { LoggerService } from './logger/logger.service';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.useLogger(app.get(LoggerService));

  app.useGlobalInterceptors(new UnifiedResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(requestIdMiddleware(), helmet());

  const configService = app.get(ConfigService);

  const server = configService.get(ConfigIdentifier.Server);

  await app.listen(server.port);
}
bootstrap();
