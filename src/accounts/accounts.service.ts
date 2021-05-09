import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';

@Injectable()
export class AccountsService {
  async findAll() {
    return [];
  }

  async findOne(id: string) {
    return [];
  }

  async create(createAccountDto: CreateAccountDto) {
    return createAccountDto;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    return updateAccountDto;
  }

  async remove(id: string) {
    return {};
  }

  async removeAll() {
    return {};
  }
}
