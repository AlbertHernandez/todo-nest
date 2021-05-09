import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TodosModule,
    AccountsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/todo-node-dev', {
      useCreateIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
