import z from 'zod';

export const PostSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  authorId: z.number().int(),
  createdAt: z.date(),
});

export const CreatePostBodySchema = PostSchema.pick({
  title: true,
  content: true,
  authorId: true,
});

export const UpdatePostBodySchema = CreatePostBodySchema.partial();
