import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';

@Injectable()
export class TodosService {
  async findAll() {
    return [];
  }

  async findOne(id: string) {
    return [];
  }

  async create(createTodoDto: CreateTodoDto) {
    return createTodoDto;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return updateTodoDto;
  }

  async remove(id: string) {
    return {};
  }

  async removeAll() {
    return {};
  }
}
