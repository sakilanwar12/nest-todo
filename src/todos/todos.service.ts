import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createTodoForUser(userId: number, todo: Partial<Todo>): Promise<Todo> {
    const user = await this.userRepository.findOneBy({ id: userId });
console.log(user);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const newTodo = this.todoRepository.create({
      ...todo,
      user,
    });
    return this.todoRepository.save(newTodo);
  }

  findTodos() {
    return this.todoRepository.find();
  }

  async findTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }
  async updateTodoById(
    id: number,
    updateTodoDto: Partial<Todo>,
  ): Promise<Todo> {
    const todo = await this.findTodoById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = await this.findTodoById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.remove(todo);
  }
}
