import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './entities/account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';
import { ErrorMessage } from '../database/constants';
import { AccountDuplicatedException } from './exceptions';
import { AccountsRepository as IAccountsRepository } from './interfaces/accounts-repository.interface';

@Injectable()
export class AccountsRepository implements IAccountsRepository {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async findAll() {
    const accounts = await this.accountModel.find().lean();
    return accounts.map((account) => this.mapToAccount(account));
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await this.accountModel.findOne({ email }).exec();
    return account ? this.mapToAccount(account) : null;
  }

  async create(createAccountDto: CreateAccountDto) {
    let account = null;
    try {
      account = await this.accountModel.create(createAccountDto);
    } catch (error) {
      if (error.message.includes(ErrorMessage.Duplicate) === true) {
        throw new AccountDuplicatedException({
          values: error.keyValue,
        });
      }
      throw error;
    }
    return account ? this.mapToAccount(account) : null;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountModel
      .findOneAndUpdate({ id }, { $set: updateAccountDto }, { new: true })
      .lean()
      .exec();
    return account ? this.mapToAccount(account) : null;
  }

  async remove(id: string) {
    await this.accountModel.deleteOne({
      id,
    });
  }

  async removeAll() {
    await this.accountModel.deleteMany();
  }

  private mapToAccount(
    accountDocument: LeanDocument<AccountDocument>,
  ): Account {
    return {
      id: accountDocument.id,
      name: accountDocument.name,
      email: accountDocument.email,
      createdAt: accountDocument.createdAt,
      updatedAt: accountDocument.updatedAt,
    };
  }
}
