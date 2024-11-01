import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  createTodo(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.todoRepository.create({
      ...todo,
      createdAt: new Date(),
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
