import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { TodoNotFoundException } from './exceptions/todo-not-found.exception';
import { LoggerService } from 'src/server/logger/logger.service';
import { TodosRepository } from './interfaces/todos-repository.interface';
import { TodosService as ITodosService } from './interfaces/todos-service.interface';
import { AccountsService } from 'src/application/accounts/interfaces/accounts-service.interface';
import { ACCOUNTS_SERVICE } from 'src/application/accounts/constants';
import { TODOS_REPOSITORY } from './constants';

@Injectable()
export class TodosService implements ITodosService {
  constructor(
    @Inject(ACCOUNTS_SERVICE)
    private readonly accountsService: AccountsService,
    private readonly logger: LoggerService,
    @Inject(TODOS_REPOSITORY)
    private readonly todosRepository: TodosRepository,
  ) {
    this.logger.setContext(TodosService.name);
  }

  async findAll() {
    return await this.todosRepository.findAll();
  }

  async findOne(id: string) {
    const todo = await this.todosRepository.findOne(id);
    if (!todo) {
      throw new TodoNotFoundException(id);
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto) {
    this.logger.verbose({
      msg: 'Creating a todo...',
      context: { createTodoDto },
    });

    const account = await this.accountsService.findByEmail(
      createTodoDto.author,
    );

    if (!account) {
      this.logger.error({
        msg: 'Not able to create the todo, account does not exist',
        context: { createTodoDto },
      });

      throw new NotFoundException(`Author "${createTodoDto.author}" not found`);
    }

    const todo = await this.todosRepository.create(createTodoDto);

    this.logger.verbose({
      msg: 'Todo created successfully',
      context: {
        todo,
      },
    });

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    this.logger.verbose({
      msg: 'Updating todo...',
      context: {
        id,
        updateTodoDto,
      },
    });

    const updatedTodo = await this.todosRepository.update(id, updateTodoDto);

    if (!updatedTodo) {
      this.logger.error({
        msg: 'Todo does not exist',
        context: {
          id,
          updateTodoDto,
        },
      });

      throw new TodoNotFoundException(id);
    }

    this.logger.verbose({
      msg: 'Todo updated successfully',
      context: {
        updatedTodo,
      },
    });

    return updatedTodo;
  }

  async remove(id: string) {
    this.logger.verbose({
      msg: 'Removing todo...',
      context: {
        id,
      },
    });

    await this.todosRepository.remove(id);

    this.logger.verbose({
      msg: 'Todo removed',
      context: {
        id,
      },
    });
  }

  async removeAll() {
    this.logger.verbose({
      msg: 'Removing All todos...',
    });

    await this.todosRepository.removeAll();

    this.logger.verbose({
      msg: 'Removed all todos',
    });
  }
}
