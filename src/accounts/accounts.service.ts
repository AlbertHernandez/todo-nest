import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';
import { Account } from './entities/account.entity';
import { AccountNotFoundException } from './exceptions';
import { LoggerService } from '../logger/logger.service';
import { AccountsService as IAccountsService } from './interfaces/accounts-service.interface';
import { AccountsRepository } from './interfaces/accounts-repository.interface';

@Injectable()
export class AccountsService implements IAccountsService {
  constructor(
    @Inject('AccountsRepository')
    private readonly accountsRepository: AccountsRepository,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AccountsService.name);
  }

  async findAll() {
    return await this.accountsRepository.findAll();
  }

  async findByEmail(email: string): Promise<Account | null> {
    return await this.accountsRepository.findByEmail(email);
  }

  async create(createAccountDto: CreateAccountDto) {
    this.logger.verbose({
      msg: 'Creating account.',
      context: { createAccountDto },
    });

    const account = await this.accountsRepository.create(createAccountDto);

    this.logger.verbose({
      msg: 'Account created successfully',
      context: { account },
    });

    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    this.logger.verbose({
      msg: 'Updating account...',
      context: { id, updateAccountDto },
    });

    const updatedAccount = await this.accountsRepository.update(
      id,
      updateAccountDto,
    );

    if (!updatedAccount) {
      this.logger.error({
        msg: 'Account does not exist!',
        context: { id, updateAccountDto },
      });
      throw new AccountNotFoundException(id);
    }

    this.logger.verbose({
      msg: 'Account updated successfully!',
      context: { updatedAccount },
    });

    return updatedAccount;
  }

  async remove(id: string) {
    this.logger.verbose({
      msg: 'Removing account...',
      context: { id },
    });

    await this.accountsRepository.remove(id);

    this.logger.verbose({
      msg: 'Account removed successfully',
      context: { id },
    });
  }

  async removeAll() {
    this.logger.verbose({
      msg: 'Removing all account...',
    });

    await this.accountsRepository.removeAll();

    this.logger.verbose({
      msg: 'All accounts removed successfully',
    });
  }
}
