import { NotFoundException } from '@nestjs/common';

export class AccountNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Account with the id "${id}" not found`);
  }
}
