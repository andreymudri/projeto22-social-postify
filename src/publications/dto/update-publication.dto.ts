import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  mediaId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
