import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SentryErrorTrackerService } from './sentry-error-tracker.service';
import { ConfigService } from '@nestjs/config';
import { SentryErrorTrackerMiddleware } from './sentry-error-tracker.middleware';
import { ALL_ROUTES } from '../../routes/routes.constants';

@Module({
  exports: [SentryErrorTrackerService],
  providers: [SentryErrorTrackerService, Logger, ConfigService],
})
export class SentryErrorTrackerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SentryErrorTrackerMiddleware).forRoutes(ALL_ROUTES);
  }
}
