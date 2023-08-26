import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpCode,
  Put,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    try {
      return this.publicationsService.create(createPublicationDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll() {
    try {
      const publications = await this.publicationsService.findAll();
      return publications;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.publicationsService.findOne(+id);
    } catch (error) {
      if (error.message === 'Publication not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    try {
      return this.publicationsService.update(+id, updatePublicationDto);
    } catch (error) {
      if (error.message === 'Publication not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.publicationsService.remove(+id);
    } catch (error) {
      if (error.message === 'Publication not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }
}
