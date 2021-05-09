import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async findAll() {
    return await this.accountModel.find();
  }

  async findOne(id: string) {
    const account = await this.accountModel.findOne({ id }).exec();
    if (!account) {
      throw new NotFoundException(`Account #${id} not found`);
    }
    return account;
  }

  async create(createTodoDto: CreateAccountDto) {
    const account = new this.accountModel(createTodoDto);
    return await account.save();
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const existingAccount = await this.accountModel
      .findOneAndUpdate({ id }, { $set: updateAccountDto }, { new: true })
      .exec();

    if (!existingAccount) {
      throw new NotFoundException(`Account #${id} not found`);
    }
    return existingAccount;
  }

  async remove(id: string) {
    const account = await this.findOne(id);
    return await account.remove();
  }

  async removeAll() {
    await this.accountModel.deleteMany();
  }
}
