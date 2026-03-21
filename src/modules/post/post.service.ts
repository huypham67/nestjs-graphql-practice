import { Injectable } from '@nestjs/common';
import { CreatePostInput, UpdatePostInput } from 'src/modules/post/post.dto';
import { PostRepository } from 'src/modules/post/post.repository';
@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll() {
    return this.postRepository.findAll();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new Error('Post not found');
    return post;
  }

  async create(input: CreatePostInput) {
    return this.postRepository.create({
      title: input.title,
      content: input.content,
      author: {
        connect: { id: input.authorId },
      },
    });
  }

  async update(id: number, input: UpdatePostInput) {
    return this.postRepository.update(id, input);
  }

  async delete(id: number) {
    await this.postRepository.delete(id);
    return true;
  }

  async findByAuthor(authorId: number) {
    return this.postRepository.findByAuthor(authorId);
  }
}
