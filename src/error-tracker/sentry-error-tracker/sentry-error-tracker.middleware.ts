import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SentryErrorTrackerService } from './sentry-error-tracker.service';
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryErrorTrackerMiddleware implements NestMiddleware {
  constructor(private readonly sentryService: SentryErrorTrackerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.sentryService.configureScope((scope) => {
      scope.addEventProcessor((event) => {
        return Sentry.Handlers.parseRequest(event, req);
      });

      if (scope.context != null) {
        scope.setContext('Context', scope.context);
      }

      // if (err.response != null) {
      //   scope.setContext('Response', err.response);
      // }

      // if (scope.user != null) {
      //   scope.setUser(data.user);
      // }
    });

    next();
  }
}
