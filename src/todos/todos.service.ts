import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { AccountsService } from '../accounts/accounts.service';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly logger: Logger,
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
      throw new NotFoundException(`Todo #${id} not found`);
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

      throw new NotFoundException(`Todo #${id} not found`);
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
