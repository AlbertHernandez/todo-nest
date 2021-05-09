import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AccountsModule } from './accounts/accounts.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    CommonModule,
    TodosModule,
    AccountsModule,
  ],
})
export class AppModule {}
