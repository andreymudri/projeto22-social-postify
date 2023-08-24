import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  async create(createPostDto: CreatePostDto) {
    return this.postsRepository.create(createPostDto);
  }

  async findAll() {
    return this.postsRepository.findAll();
  }

  async findOne(id: number) {
    const check = await this.postsRepository.findOne(id);
    if (!check) {
      throw new HttpException('Post not found', 404);
    }
    return check;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const check = await this.postsRepository.findOne(id);
    if (!check) {
      throw new HttpException('Post not found', 404);
    }
    return this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const check = await this.postsRepository.findOne(id);
    if (!check) {
      throw new HttpException('Post not found', 404);
    }
    const checkforPublications =
      await this.postsRepository.checkforPublications(id);
    if (checkforPublications.length > 0) {
      throw new HttpException('There is a publication for this post', 403);
    }
    return this.postsRepository.remove(id);
  }
}
