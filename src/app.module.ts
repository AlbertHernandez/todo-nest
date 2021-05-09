import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [TodosModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
