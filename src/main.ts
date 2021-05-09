import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnifiedResponseInterceptor } from './common/interceptors/unified-response.interceptor';
import { Identifiers } from './configuration/constants';

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

  const configService = app.get(ConfigService);

  const appPort = configService.get(Identifiers.Port);

  await app.listen(appPort);
}
bootstrap();
