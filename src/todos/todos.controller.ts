import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { TodosService } from './interfaces/todos-service.interface';

@Controller('v1/todos')
export class TodosController {
  constructor(
    @Inject('TodosService')
    private readonly todosService: TodosService,
  ) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todosService.update(id, updateTodoDto);
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
