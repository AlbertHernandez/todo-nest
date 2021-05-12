import { Logger, Module } from '@nestjs/common';
import { SentryErrorTrackerService } from './sentry-error-tracker.service';
import { ConfigService } from '@nestjs/config';

@Module({
  exports: [SentryErrorTrackerService],
  providers: [SentryErrorTrackerService, Logger, ConfigService],
})
export class SentryErrorTrackerModule {}
