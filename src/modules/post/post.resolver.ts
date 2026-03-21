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
import { UserLoader } from 'src/modules/user/user.loader';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userLoader: UserLoader,
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

  // Cái này chỉ được gọi khi client yêu cầu field author của Post, không phải khi gọi query posts hoặc post
  @ResolveField(() => User)
  author(@Parent() post: Post) {
    return this.userLoader.batchUsers.load(post.authorId);
  }
}
