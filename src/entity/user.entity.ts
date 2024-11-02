import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Todo } from './todo.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToMany(() => Todo, (todo) => todo.user, { cascade: true })
  todos: Todo[];

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
  
 
}
