import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
