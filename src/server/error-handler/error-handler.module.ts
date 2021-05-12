import { Global, Logger, Module } from '@nestjs/common';
import { ErrorHandlerService } from './error-handler.service';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { SentryErrorTrackerService } from 'src/server/error-tracker/sentry-error-tracker/sentry-error-tracker.service';
import { SentryErrorTrackerModule } from '../error-tracker/sentry-error-tracker/sentry-error-tracker.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ERROR_TRACKER_SERVICE } from 'src/server/error-tracker/constants';

@Global()
@Module({
  imports: [SentryErrorTrackerModule],
  exports: [ErrorHandlerService],
  providers: [
    ErrorHandlerService,
    ConfigService,
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
export class ErrorHandlerModule {}
