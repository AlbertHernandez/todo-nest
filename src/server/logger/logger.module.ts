import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerMiddleware } from './logger.middleware';
import { ALL_ROUTES } from '../routes/routes.constants';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ALL_ROUTES);
  }
}
