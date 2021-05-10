import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SentryInterceptor } from 'src/sentry/sentry.interceptor';
import { SentryModule } from 'src/sentry/sentry.module';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
  imports: [ConfigModule, SentryModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
  ],
})
export class CommonModule {}
