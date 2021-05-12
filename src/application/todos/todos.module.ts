import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema, Todo } from './entities/todo.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { TodosRepository } from './todos.repository';
import { LoggerModule } from 'src/server/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
    AccountsModule,
    LoggerModule,
  ],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}
