import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentVariablesSchema } from './schemas';
import { getDatabaseConfig, getServerConfig } from './config';
import { getSentryConfig } from './config/sentry-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getServerConfig, getDatabaseConfig, getSentryConfig],
      validationSchema: environmentVariablesSchema,
    }),
  ],
})
export class ConfigurationModule {}
