import { Request, Response, NextFunction } from 'express';
import { CORRELATION_ID_HEADER, CORRELATION_ID_KEY } from '../constants';
import { generateUuid } from '../helpers';

export function requestIdMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const correlationHeader = req.header(CORRELATION_ID_KEY) ?? generateUuid();
    req.headers[CORRELATION_ID_KEY] = correlationHeader;
    res.set(CORRELATION_ID_HEADER, correlationHeader);

    next();
  };
}
