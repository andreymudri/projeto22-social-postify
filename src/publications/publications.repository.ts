import { HttpException, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPublicationDto: CreatePublicationDto) {
    const create = this.prisma.publications.create({
      data: createPublicationDto,
    });
    return create;
  }

  async findAll() {
    const result = await this.prisma.publications.findMany();
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.publications.findUnique({
      where: { id },
    });
    return result;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const check = await this.findOne(id);
    if (!check) {
      throw new HttpException('Publication not found', 404);
    }
    return this.prisma.publications.update({
      where: { id },
      data: updatePublicationDto,
    });
  }
  async remove(id: number) {
    const check = await this.findOne(id);
    if (!check) {
      throw new HttpException('Publication not found', 404);
    }
    return this.prisma.publications.delete({
      where: { id },
    });
  }
  async checkPosts(id: number) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
    });
    return post;
  }
  async checkMedias(id: number) {
    const media = await this.prisma.medias.findUnique({
      where: { id },
    });
    return media;
  }
}
