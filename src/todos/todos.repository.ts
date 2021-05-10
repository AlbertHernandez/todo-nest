import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { LeanDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDocument, Todo } from './entities/todo.entity';
import { ErrorMessage } from '../database/constants';
import { DuplicatedTodoException } from './exceptions';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async findAll() {
    const todos = await this.todoModel.find();
    return todos.map((todo) => this.mapToTodo(todo));
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findOne({ id }).lean().exec();
    return todo ? this.mapToTodo(todo) : null;
  }

  async create(createTodoDto: CreateTodoDto) {
    let todo = null;
    try {
      todo = await this.todoModel.create(createTodoDto);
    } catch (error) {
      if (error.message.includes(ErrorMessage.Duplicate) === true) {
        throw new DuplicatedTodoException({
          values: error.keyValue,
        });
      }
      throw error;
    }
    return todo ? this.mapToTodo(todo) : null;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoModel
      .findOneAndUpdate({ id }, { $set: updateTodoDto }, { new: true })
      .lean()
      .exec();

    return todo ? this.mapToTodo(todo) : null;
  }

  async remove(id: string) {
    await this.todoModel.remove(id);
  }

  async removeAll() {
    await this.todoModel.deleteMany();
  }

  private mapToTodo(todoDocument: LeanDocument<TodoDocument>): Todo {
    return {
      id: todoDocument.id,
      author: todoDocument.author,
      title: todoDocument.title,
      content: todoDocument.content,
      isCompleted: todoDocument.isCompleted,
      updatedAt: todoDocument.updatedAt,
      createdAt: todoDocument.createdAt,
    };
  }
}
