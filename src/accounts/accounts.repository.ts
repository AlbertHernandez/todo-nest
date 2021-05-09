import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Account, AccountDocument } from './entities/account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(AccountRepository.name);
  }

  async findAll() {
    const accounts = await this.accountModel.find();
    return accounts.map((account) => this.mapToAccount(account));
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await this.accountModel.findOne({ email }).exec();
    return account ? this.mapToAccount(account) : null;
  }

  async create(createAccountDto: CreateAccountDto) {
    const account = await this.accountModel.create(createAccountDto);
    return this.mapToAccount(account);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountModel
      .findOneAndUpdate({ id }, { $set: updateAccountDto }, { new: true })
      .exec();
    return this.mapToAccount(account);
  }

  async remove(id: string) {
    await this.accountModel.deleteOne({
      id,
    });
  }

  async removeAll() {
    await this.accountModel.deleteMany();
  }

  private mapToAccount(accountDocument: AccountDocument): Account {
    return {
      id: accountDocument.id,
      name: accountDocument.name,
      email: accountDocument.email,
      createdAt: accountDocument.createdAt,
      updatedAt: accountDocument.updatedAt,
    };
  }
}
