import { Inject, Injectable, Logger } from '@nestjs/common';
import { ErrorHandler } from './error-handler.interface';
import { ErrorTracker } from 'src/error-tracker/error-tracker.interface';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    @Inject('ErrorTracker')
    private readonly errorTracker: ErrorTracker,
  ) {}

  async handleError(error: Error): Promise<void> {
    this.errorTracker.trackError(error);
  }
}
