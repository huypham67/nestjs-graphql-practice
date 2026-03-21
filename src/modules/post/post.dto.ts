import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { User } from 'src/modules/user/user.dto';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Int)
  authorId: number;

  @Field()
  createdAt: Date;

  // 🔥 nested
  @Field(() => User)
  author: User;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Int)
  authorId: number;
}

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {}
