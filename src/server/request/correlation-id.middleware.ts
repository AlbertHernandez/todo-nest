import { Request, Response, NextFunction } from 'express';
import { generateUuid } from '../../common/helpers';
import { CORRELATION_ID_HEADER, CORRELATION_ID_KEY } from './request.constants';

export function correlationIdMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const correlationHeader = req.header(CORRELATION_ID_KEY) ?? generateUuid();
    req.headers[CORRELATION_ID_KEY] = correlationHeader;
    res.set(CORRELATION_ID_HEADER, correlationHeader);

    next();
  };
}
