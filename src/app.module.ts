import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AccountsModule } from './accounts/accounts.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { SentryErrorTrackerModule } from './error-tracker/sentry-error-tracker/sentry-error-tracker.module';

@Module({
  imports: [
    LoggerModule,
    ConfigurationModule,
    DatabaseModule,
    SentryErrorTrackerModule,
    CommonModule,
    TodosModule,
    AccountsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
