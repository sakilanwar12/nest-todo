import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { CreateTodoDto } from '../dtos/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}
  @Post('user/:userId')
  createTodo(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.createTodoForUser(userId, createTodoDto);
  }

  @Get()
  findTodos() {
    return this.todosService.findTodos();
  }

  @Get(':id')
  findTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findTodoById(id);
  }
  @Get('user/:userId')
  findTodosByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.todosService.findTodosByUser(userId);
  }

  @Put(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: CreateTodoDto,
  ) {
    return this.todosService.updateTodoById(id, updateTodoDto);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.deleteTodo(id);
  }
}
