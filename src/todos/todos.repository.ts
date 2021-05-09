import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { LeanDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDocument, Todo } from './entities/todo.entity';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(TodosRepository.name);
  }

  async findAll() {
    const todos = await this.todoModel.find();
    return todos.map((todo) => this.mapToTodo(todo));
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findOne({ id }).lean().exec();
    return todo ? this.mapToTodo(todo) : null;
  }

  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoModel.create(createTodoDto);
    return this.mapToTodo(todo);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoModel
      .findOneAndUpdate({ id }, { $set: updateTodoDto }, { new: true })
      .lean()
      .exec();

    return this.mapToTodo(todo);
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
