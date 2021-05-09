import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async findAll() {
    return await this.todoModel.find();
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findOne({ id }).exec();
    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto) {
    const todo = new this.todoModel(createTodoDto);
    return await todo.save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const existingTodo = await this.todoModel
      .findOneAndUpdate({ id }, { $set: updateTodoDto }, { new: true })
      .exec();

    if (!existingTodo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return existingTodo;
  }

  async remove(id: string) {
    const todo = await this.findOne(id);
    return await todo.remove();
  }

  async removeAll() {
    await this.todoModel.deleteMany();
  }
}
