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

  async findByEmail(email: string): Promise<Account | null> {
    const account = await this.accountModel.findOne({ email }).exec();
    return account || null;
  }

  async create(createTodoDto: CreateAccountDto) {
    const account = await this.accountModel.create(createTodoDto);
    return account;
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
    await this.accountModel.deleteOne({
      id,
    });
  }

  async removeAll() {
    await this.accountModel.deleteMany();
  }
}
