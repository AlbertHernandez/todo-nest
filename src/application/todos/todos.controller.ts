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
import { TODOS, TODOS_SERVICE } from './constants';
import { V1 } from '../../server/routes/routes.constants';

@Controller(`${V1}/${TODOS}`)
export class TodosController {
  constructor(
    @Inject(TODOS_SERVICE)
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
