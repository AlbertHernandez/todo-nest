import { NotAcceptableException } from '@nestjs/common';

export class DuplicatedTodoException extends NotAcceptableException {
  constructor(context: any) {
    super({
      message: 'Duplicated Todo',
      ...context,
    });
  }
}
