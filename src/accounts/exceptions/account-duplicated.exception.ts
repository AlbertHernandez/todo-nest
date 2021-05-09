import { NotAcceptableException } from '@nestjs/common';

export class AccountDuplicatedException extends NotAcceptableException {
  constructor(context: any) {
    super({
      message: 'Duplicated Account',
      ...context,
    });
  }
}
