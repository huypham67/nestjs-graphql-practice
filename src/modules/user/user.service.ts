import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from 'src/modules/user/user.dto';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findManyByIds(ids: number[]) {
    return this.userRepository.findManyByIds(ids);
  }

  create(createUserInput: CreateUserInput) {
    return this.userRepository.create(createUserInput);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, updateUserInput);
  }

  delete(id: number) {
    return this.userRepository.remove(id);
  }
}
