import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

  @IsNotEmpty()
  @IsBoolean()
  isDigital: boolean;

  @IsNotEmpty()
  @IsNumber()
  productCategoryId: number;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
