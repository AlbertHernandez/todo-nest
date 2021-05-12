import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, AccountsModule],
})
export class ApplicationModule {}
