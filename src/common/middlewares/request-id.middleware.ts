import { Request, Response, NextFunction } from 'express';
import { generateUuid } from '../helpers';

export function requestIdMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const correlationIdKey = 'x-correlation-id';

    const correlationHeader = req.header(correlationIdKey) ?? generateUuid();
    req.headers[correlationIdKey] = correlationHeader;
    res.set('X-Correlation-ID', correlationHeader);

    next();
  };
}
