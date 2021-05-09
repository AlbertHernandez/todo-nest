import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService extends PinoLogger {
  verbose(msg) {
    this.trace(msg);
  }

  log(msg) {
    this.info(msg);
  }
}
