import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserParams } from 'src/users/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }

  async createUsers(newUser: UserParams): Promise<User> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      // Create a new user instance with hashed password
      const user = this.userRepository.create({
        ...newUser,
        password: hashedPassword,
        createdAt: new Date(),
      });

      // Save the user to the database
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Failed to create user: ' + error.message);
    }
  }

  async updateUser(id: number, updateUserDto: UserParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepository.update(id, updateUserDto);
  }
  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepository.delete(id);
  }
}
