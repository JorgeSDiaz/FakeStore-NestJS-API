import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly brandId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly CustomerId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
