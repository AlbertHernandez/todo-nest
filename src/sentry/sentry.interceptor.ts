import * as Sentry from '@sentry/node';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Handlers } from '@sentry/node';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SentryService } from './sentry.service';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  constructor(private readonly sentryService: SentryService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const http = context.switchToHttp();
        const data = Handlers.parseRequest(<any>{}, http.getRequest(), {});

        this.sentryService.configureScope((scope) => {
          scope.addEventProcessor((event) => {
            return Sentry.Handlers.parseRequest(event, data.request);
          });

          if (scope.context != null) {
            scope.setContext('Context', scope.context);
          }

          if (err.response != null) {
            scope.setContext('Response', err.response);
          }

          if (scope.user != null) {
            scope.setUser(data.user);
          }

          this.sentryService.trackError(err);
        });

        throw err;
      }),
    );
  }
}
