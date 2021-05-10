import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dto/create-account-dto';
import { UpdateAccountDto } from '../dto/update-account-dto';

export interface AccountsService {
  findAll: () => Promise<Account[]>;
  findByEmail: (email: string) => Promise<Account | null>;
  create: (createAccountDto: CreateAccountDto) => Promise<Account>;
  update: (
    id: string,
    updateAccountDto: UpdateAccountDto,
  ) => Promise<Account | null>;
  remove: (id: string) => Promise<void>;
  removeAll: () => Promise<void>;
}
