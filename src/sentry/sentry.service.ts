import * as Sentry from '@sentry/node';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SentryConfig, ServerConfig } from 'src/configuration/interfaces';
import { ConfigIdentifier } from '../configuration/constants';

@Injectable()
export class SentryService {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(SentryService.name);

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

  async trackError(error: Error): Promise<void> {
    Sentry.captureException(error);
  }

  configureScope(callback) {
    Sentry.configureScope((scope) => {
      callback(scope);
    });
  }
}
