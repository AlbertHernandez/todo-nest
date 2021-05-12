import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [
    ApplicationModule,
    ConfigurationModule,
    DatabaseModule,
    ErrorHandlerModule,
    AuthorizationModule,
  ],
})
export class ServerModule {}
