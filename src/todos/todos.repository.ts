import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(TodosRepository.name);
  }

  async findAll() {
    return await this.todoModel.find();
  }

  async findOne(id: string) {
    return await this.todoModel.findOne({ id }).exec();
  }

  async create(createTodoDto: CreateTodoDto) {
    return await this.todoModel.create(createTodoDto);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.todoModel
      .findOneAndUpdate({ id }, { $set: updateTodoDto }, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.todoModel.remove(id);
  }

  async removeAll() {
    await this.todoModel.deleteMany();
  }
}
