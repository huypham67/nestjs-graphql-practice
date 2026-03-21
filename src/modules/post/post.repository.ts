import { Injectable } from '@nestjs/common';
import { Post } from 'generated/prisma/client';
import { PostCreateInput, PostUpdateInput } from 'generated/prisma/models';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  findByAuthor(authorId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { authorId },
    });
  }

  create(data: PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  update(id: number, data: PostUpdateInput): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
