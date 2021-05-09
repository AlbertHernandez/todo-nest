import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AccountRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(AccountsService.name);
  }

  async findAll() {
    return await this.accountRepository.findAll();
  }

  async findByEmail(email: string): Promise<Account | null> {
    return await this.accountRepository.findByEmail(email);
  }

  async create(createAccountDto: CreateAccountDto) {
    this.logger.verbose({
      msg: 'Creating account.',
      context: { createAccountDto },
    });

    const account = await this.accountRepository.create(createAccountDto);

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

    const updatedAccount = await this.accountRepository.update(
      id,
      updateAccountDto,
    );

    if (!updatedAccount) {
      this.logger.error({
        msg: 'Account does not exist!',
        context: { id, updateAccountDto },
      });
      throw new NotFoundException(`Account #${id} not found`);
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

    await this.accountRepository.remove(id);

    this.logger.verbose({
      msg: 'Account removed successfully',
      context: { id },
    });
  }

  async removeAll() {
    this.logger.verbose({
      msg: 'Removing all account...',
    });

    await this.accountRepository.removeAll();

    this.logger.verbose({
      msg: 'All accounts removed successfully',
    });
  }
}
