import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Medias as MediaModel } from '@prisma/client';
import { MediaEntity } from './entities/media.entity';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMediaDto: CreateMediaDto): Promise<MediaModel> {
    const { title, username } = createMediaDto;
    const mediaEntity = new MediaEntity(title, username);
    const result = await this.prisma.medias.create({
      data: mediaEntity,
    });
    return result;
  }
  findAll(): Promise<MediaModel[]> {
    const result = this.prisma.medias.findMany();
    return result;
  }

  async findOneByUserName(
    Dtousername: string,
    Dtotitle: string,
  ): Promise<MediaModel | unknown> {
    const createEntity: MediaEntity = new MediaEntity(Dtotitle, Dtousername);
    const { username, title } = createEntity;
    const result = await this.prisma.medias.findFirst({
      where: {
        username: username,
        title: title,
      },
    });
    return result;
  }
  async findOne(id: number): Promise<MediaModel> {
    const result = await this.prisma.medias.findUnique({
      where: { id },
    });
    return result;
  }
  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const updatedMedia = await this.prisma.medias.update({
      where: { id },
      data: updateMediaDto,
    });
    return updatedMedia;
  }
  async checkforPublications(id: number) {
    const publications = await this.prisma.publications.findMany({
      where: { mediaId: id },
    });
    return publications;
  }

  async remove(id: number) {
    const result = await this.prisma.medias.delete({
      where: { id },
    });
    return result;
  }
}
