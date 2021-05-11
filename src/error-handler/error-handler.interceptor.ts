import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  constructor(private readonly errorHandlerService: ErrorHandlerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        this.errorHandlerService.handleError(err);
        throw err;
      }),
    );
  }
}
