import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(AccountRepository.name);
  }

  async findAll() {
    return await this.accountModel.find();
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await this.accountModel.findOne({ email }).exec();
    return account || null;
  }

  async create(createAccountDto: CreateAccountDto) {
    return await this.accountModel.create(createAccountDto);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    return await this.accountModel
      .findOneAndUpdate({ id }, { $set: updateAccountDto }, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.accountModel.deleteOne({
      id,
    });
  }

  async removeAll() {
    await this.accountModel.deleteMany();
  }
}
