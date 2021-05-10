import { Logger, Module } from '@nestjs/common';
import { SentryService } from './sentry.service';
import { ConfigService } from '@nestjs/config';
import { SentryInterceptor } from './sentry.interceptor';

@Module({
  exports: [SentryService, SentryInterceptor],
  providers: [SentryService, Logger, ConfigService, SentryInterceptor],
})
export class SentryModule {}
