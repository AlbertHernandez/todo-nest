import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AccountsModule } from './accounts/accounts.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { SentryErrorTrackerModule } from './error-tracker/sentry-error-tracker/sentry-error-tracker.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { ErrorHandlerInterceptor } from './error-handler/error-handler.interceptor';
import { SentryErrorTrackerMiddleware } from './error-tracker/sentry-error-tracker/sentry-error-tracker.middleware';
import { ConfigModule } from '@nestjs/config';
import { ErrorHandlerModule } from './error-handler/error-handler.module';

const ALL_ROUTES = '*';

@Module({
  imports: [
    LoggerModule,
    ConfigurationModule,
    DatabaseModule,
    SentryErrorTrackerModule,
    TodosModule,
    AccountsModule,
    ConfigModule,
    ErrorHandlerModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorHandlerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ALL_ROUTES);
    consumer.apply(SentryErrorTrackerMiddleware).forRoutes(ALL_ROUTES);
  }
}
