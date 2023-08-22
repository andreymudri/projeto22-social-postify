import { HttpException, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository,
  ) {}
  async create(createPublicationDto: CreatePublicationDto) {
    const media = await this.publicationsRepository.checkMedias(
      createPublicationDto.mediaId,
    );
    if (!media) {
      throw new HttpException('Media not found', 404);
    }
    const post = await this.publicationsRepository.checkPosts(
      createPublicationDto.postId,
    );
    if (!post) {
      throw new HttpException('Post not found', 404);
    }
    const create =
      await this.publicationsRepository.create(createPublicationDto);
    return create;
  }

  async findAll() {
    return await this.publicationsRepository.findAll();
  }

  async findOne(id: number) {
    return await this.publicationsRepository.findOne(id);
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const media = await this.publicationsRepository.checkMedias(
      updatePublicationDto.mediaId,
    );
    if (!media) {
      throw new HttpException('Media not found', 404);
    }
    const post = await this.publicationsRepository.checkPosts(
      updatePublicationDto.postId,
    );
    if (!post) {
      throw new HttpException('Post not found', 404);
    }
    const check = this.publicationsRepository.findOne(id);
    if (!check) {
      throw new HttpException('Publication not found', 404);
    }
    return await this.publicationsRepository.update(id, updatePublicationDto);
  }

  async remove(id: number) {
    const check = await this.publicationsRepository.findOne(id);
    if (!check) {
      throw new HttpException('Publication not found', 404);
    }
    return await this.publicationsRepository.remove(id);
  }
}
