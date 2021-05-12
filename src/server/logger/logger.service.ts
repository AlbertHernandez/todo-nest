import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class LoggerService extends Logger {
  private loggerContext?: any;

  log(message: any) {
    const formattedMessage = this.formatMessage(message);

    super.log(formattedMessage);
  }

  verbose(message: any) {
    const formattedMessage = this.formatMessage(message);

    super.log(formattedMessage);
  }

  error(message: any) {
    const formattedMessage = this.formatMessage(message);

    super.error(formattedMessage);
  }

  warn(message: any) {
    const formattedMessage = this.formatMessage(message);

    super.warn(formattedMessage);
  }

  debug(message: any) {
    const formattedMessage = this.formatMessage(message);

    super.debug(formattedMessage);
  }

  private formatMessage(message: any) {
    let formattedMessage = {};

    if (this.loggerContext) {
      formattedMessage = {
        ...formattedMessage,
        ...this.loggerContext,
      };
    }

    if (typeof message === 'string') {
      formattedMessage = {
        ...formattedMessage,
        msg: message,
      };
    } else {
      formattedMessage = {
        ...formattedMessage,
        ...message,
      };
    }

    return formattedMessage;
  }

  setLoggerContext(loggerContext: any) {
    this.loggerContext = loggerContext;
  }
}
