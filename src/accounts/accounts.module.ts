import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
