import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}
  async create(createMediaDto: CreateMediaDto) {
    const check = await this.mediasRepository.findOneByUserName(
      createMediaDto.username,
      createMediaDto.title,
    );
    if (check) throw new HttpException('Media already exists', 409);
    return await this.mediasRepository.create(createMediaDto);
  }

  async findAll() {
    return await this.mediasRepository.findAll();
  }

  async findOne(id: number) {
    return await this.mediasRepository.findOne(id);
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const existingMedia = await this.mediasRepository.findOne(id);
    if (!existingMedia) {
      throw new NotFoundException();
    }
    if (!updateMediaDto.title) {
      updateMediaDto.title = existingMedia.title;
    }
    if (updateMediaDto.username) {
      if (existingMedia.username !== updateMediaDto.username) {
        updateMediaDto.username = `http://www.${updateMediaDto.title}.com/${updateMediaDto.username}`;
      }
    }
    return this.mediasRepository.update(id, updateMediaDto);
  }
  async remove(id: number) {
    const check = await this.mediasRepository.findOne(id);
    if (!check) {
      throw new HttpException('Media not found', 404);
    }
    const checkforPublications =
      await this.mediasRepository.checkforPublications(id);
    if (checkforPublications.length > 0) {
      throw new HttpException('There is a publication for this media', 403);
    }
    return await this.mediasRepository.remove(id);
  }
}
