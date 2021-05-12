import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server/server.module';
import { UnifiedRequestResponseInterceptor } from './server/request/unified-request-response.interceptor';
import { ConfigIdentifier } from './server/configuration/constants';
import * as helmet from 'helmet';
import { correlationIdMiddleware } from './server/request/correlation-id.middleware';
import { API } from './server/server.constants';
import { ServerConfig } from './server/configuration/interfaces';

async function bootstrap() {
  const server = await NestFactory.create(ServerModule);

  server.useGlobalInterceptors(new UnifiedRequestResponseInterceptor());

  server.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  server.setGlobalPrefix(API);

  server.use(correlationIdMiddleware(), helmet());

  const configService = server.get(ConfigService);

  const serverConfig = configService.get<ServerConfig>(ConfigIdentifier.Server);

  await server.listen(serverConfig.port);

  const logger = server.get(Logger);

  logger.log(`Server is listening on port ${serverConfig.port}.`);
}

bootstrap();

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException: ${error}`);
  process.exit(1);
});
