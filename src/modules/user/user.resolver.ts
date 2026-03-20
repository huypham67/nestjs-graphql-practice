import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CreateUserInput,
  UpdateUserInput,
  User,
} from 'src/modules/user/user.dto';
import {
  CreateUserBodySchema,
  UpdateUserBodySchema,
} from 'src/modules/user/user.schema';
import { UserService } from 'src/modules/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput', new ZodValidationPipe(CreateUserBodySchema))
    createUserInput: CreateUserInput,
  ) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput', new ZodValidationPipe(UpdateUserBodySchema))
    updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.delete(id);
  }
}
