import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Posts as PostModel } from '@prisma/client';
@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto): Promise<PostModel> {
    const create = await this.prisma.posts.create({
      data: createPostDto,
    });
    return create;
  }

  async findAll(): Promise<PostModel[]> {
    const result = await this.prisma.posts.findMany();
    return result;
  }

  async findOne(id: number): Promise<PostModel> {
    const result = await this.prisma.posts.findUnique({
      where: { id },
    });
    return result;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostModel> {
    const updatedPost = await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
    });
    return updatedPost;
  }

  async remove(id: number) {
    const remove = await this.prisma.posts.delete({
      where: { id },
    });
    return remove;
  }
}
