import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
