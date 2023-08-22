import { IsOptional, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  image: string;

  @IsOptional()
  title: string;

  @IsOptional()
  @IsUrl()
  text: string;
}
