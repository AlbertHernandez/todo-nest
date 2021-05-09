import { Logger, Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './entities/todo.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { TodosRepository } from './todos.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
    AccountsModule,
  ],
  controllers: [TodosController],
  providers: [TodosService, Logger, TodosRepository],
})
export class TodosModule {}
