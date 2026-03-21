import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostRepository } from 'src/modules/post/post.repository';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [PostResolver, PostService, PostRepository],
})
export class PostModule {}
