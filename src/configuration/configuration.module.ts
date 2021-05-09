import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentVariablesSchema } from './schemas';
import { getEnvironmentVariables } from './environment-variables';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getEnvironmentVariables],
      validationSchema: environmentVariablesSchema,
    }),
  ],
})
export class ConfigurationModule {}
