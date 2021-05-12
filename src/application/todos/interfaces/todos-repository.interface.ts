import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dto/create-todo-dto';
import { UpdateTodoDto } from '../dto/update-todo-dto';

export interface TodosRepository {
  findAll: () => Promise<Todo[]>;
  findOne: (id: string) => Promise<Todo | null>;
  create: (createTodoDto: CreateTodoDto) => Promise<Todo>;
  update: (id: string, updateTodoDto: UpdateTodoDto) => Promise<Todo>;
  remove: (id: string) => Promise<void>;
  removeAll: () => Promise<void>;
}
