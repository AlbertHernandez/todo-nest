import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlerInterceptor } from 'src/error-handler/error-handler.interceptor';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { SentryErrorTrackerMiddleware } from 'src/error-tracker/sentry-error-tracker/sentry-error-tracker.middleware';
import { ApiKeyGuard } from './guards/api-key.guard';
import { SentryErrorTrackerModule } from '../error-tracker/sentry-error-tracker/sentry-error-tracker.module';

@Module({
  imports: [ConfigModule, ErrorHandlerModule, SentryErrorTrackerModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorHandlerInterceptor,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SentryErrorTrackerMiddleware).forRoutes('*');
  }
}
