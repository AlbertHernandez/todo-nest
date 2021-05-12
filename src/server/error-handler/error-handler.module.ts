import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ErrorHandlerService } from './error-handler.service';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { SentryErrorTrackerService } from 'src/server/error-tracker/sentry-error-tracker/sentry-error-tracker.service';
import { SentryErrorTrackerModule } from '../error-tracker/sentry-error-tracker/sentry-error-tracker.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryErrorTrackerMiddleware } from '../error-tracker/sentry-error-tracker/sentry-error-tracker.middleware';
import { ERROR_TRACKER_SERVICE } from 'src/server/error-tracker/constants';
import { ALL_ROUTES } from '../routes/routes.constants';

@Module({
  imports: [SentryErrorTrackerModule],
  exports: [ErrorHandlerService, ErrorHandlerInterceptor],
  providers: [
    ErrorHandlerService,
    ConfigService,
    ErrorHandlerInterceptor,
    {
      provide: ERROR_TRACKER_SERVICE,
      useExisting: SentryErrorTrackerService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorHandlerInterceptor,
    },
    Logger,
  ],
})
export class ErrorHandlerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SentryErrorTrackerMiddleware).forRoutes(ALL_ROUTES);
  }
}
