import { SentryConfig } from '../interfaces';

export const getSentryConfig = (): { sentry: SentryConfig } => ({
  sentry: {
    dsn: process.env.SENTRY_DSN,
    isEnabled: process.env.IS_ENABLE_SENTRY === 'true',
  },
});
