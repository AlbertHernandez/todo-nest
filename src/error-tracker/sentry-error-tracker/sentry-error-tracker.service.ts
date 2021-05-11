import * as Sentry from '@sentry/node';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SentryConfig, ServerConfig } from 'src/configuration/interfaces';
import { ConfigIdentifier } from '../../configuration/constants';
import { ErrorTracker } from '../error-tracker.interface';

@Injectable()
export class SentryErrorTrackerService implements ErrorTracker {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(SentryErrorTrackerService.name);

    const serverConfig = this.configService.get<ServerConfig>(
      ConfigIdentifier.Server,
    );
    const sentryConfig = this.configService.get<SentryConfig>(
      ConfigIdentifier.Sentry,
    );

    if (sentryConfig.isEnabled) {
      this.logger.debug('Sentry is enabled');
    } else {
      this.logger.debug('Sentry is disabled');
    }

    Sentry.init({
      environment: serverConfig.environment,
      dsn: sentryConfig.dsn,
      tracesSampleRate: 1.0,
      serverName: 'Todo Nest Node',
      enabled: sentryConfig.isEnabled,
    });
  }

  trackError(error: Error) {
    Sentry.captureException(error);
  }

  configureScope(callback) {
    Sentry.configureScope((scope) => {
      callback(scope);
    });
  }
}
