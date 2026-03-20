import { Injectable } from '@nestjs/common';
import { CreateUserInput, User } from 'src/modules/user/user.dto';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Alex Smith',
      email: 'alex@example.com',
      password: 'password',
      createdAt: new Date().toISOString(),
    },
  ];
  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findOne(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return Promise.resolve(user);
  }

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser: User = {
      id: this.users.length + 1,
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  update(id: number, updateUserInput: CreateUserInput): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const updatedUser: User = {
      id,
      name: updateUserInput.name,
      email: updateUserInput.email,
      password: updateUserInput.password,
      createdAt: this.users[userIndex].createdAt,
    };
    this.users[userIndex] = updatedUser;
    return Promise.resolve(updatedUser);
  }

  delete(id: number): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
    return Promise.resolve(true);
  }
}
