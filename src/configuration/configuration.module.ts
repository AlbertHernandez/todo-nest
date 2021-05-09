import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentVariablesSchema } from './schemas';
import {
  getDatabaseConfig,
  getServerConfig,
} from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getServerConfig, getDatabaseConfig],
      validationSchema: environmentVariablesSchema,
    }),
  ],
})
export class ConfigurationModule {}
