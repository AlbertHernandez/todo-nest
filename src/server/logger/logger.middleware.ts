import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CORRELATION_ID_HEADER } from '../request/request.constants';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const correlationHeader = req.header(CORRELATION_ID_HEADER);

    if (correlationHeader) {
      this.logger.setLoggerContext({
        correlationId: correlationHeader,
      });
    }

    next();
  }
}
