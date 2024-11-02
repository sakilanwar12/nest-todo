import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';

import { User } from 'src/entity/user.entity';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
