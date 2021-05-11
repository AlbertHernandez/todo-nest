import { Logger, Module } from '@nestjs/common';
import { ErrorHandlerService } from './error-handler.service';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { SentryErrorTrackerService } from 'src/error-tracker/sentry-error-tracker/sentry-error-tracker.service';
import { SentryErrorTrackerModule } from '../error-tracker/sentry-error-tracker/sentry-error-tracker.module';

@Module({
  imports: [SentryErrorTrackerModule],
  exports: [ErrorHandlerService, ErrorHandlerInterceptor],
  providers: [
    ErrorHandlerService,
    ConfigService,
    ErrorHandlerInterceptor,
    {
      provide: 'ErrorTracker',
      useExisting: SentryErrorTrackerService,
    },
    Logger,
  ],
})
export class ErrorHandlerModule {}
