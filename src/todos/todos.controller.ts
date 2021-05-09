import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(id);
  }

  @Post()
  async create() {
    return await this.todosService.create();
  }

  @Patch(':id')
  async update(@Param('id') id: string) {
    return await this.todosService.update(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todosService.remove(id);
  }

  @Delete()
  async removeAll() {
    return await this.todosService.removeAll();
  }
}
