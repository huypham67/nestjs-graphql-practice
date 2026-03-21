import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Parent,
} from '@nestjs/graphql';
import { ZodValidationPipe } from 'nestjs-zod';
import { User } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { PostService } from 'src/modules/post/post.service';
import {
  CreatePostBodySchema,
  UpdatePostBodySchema,
} from 'src/modules/post/post.schema';
import {
  CreatePostInput,
  Post,
  UpdatePostInput,
} from 'src/modules/post/post.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Post])
  posts() {
    return this.postService.findAll();
  }

  @Query(() => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  createPost(
    @Args('input', new ZodValidationPipe(CreatePostBodySchema))
    input: CreatePostInput,
  ) {
    return this.postService.create(input);
  }

  @Mutation(() => Post)
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', new ZodValidationPipe(UpdatePostBodySchema))
    input: UpdatePostInput,
  ) {
    return this.postService.update(id, input);
  }

  @Mutation(() => Boolean)
  deletePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.delete(id);
  }

  @ResolveField(() => User)
  author(@Parent() post: Post) {
    return this.userService.findOne(post.authorId);
  }
}
