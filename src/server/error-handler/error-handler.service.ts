import { Inject, Injectable } from '@nestjs/common';
import { ErrorHandler } from './error-handler.interface';
import { ErrorTrackerService } from 'src/server/error-tracker/error-tracker-service.interface';
import { ERROR_TRACKER_SERVICE } from 'src/server/error-tracker/constants';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    @Inject(ERROR_TRACKER_SERVICE)
    private readonly errorTracker: ErrorTrackerService,
  ) {}

  async handleError(error: Error): Promise<void> {
    this.errorTracker.trackError(error);
  }
}
