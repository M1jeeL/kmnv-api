import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from '@prisma/client';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  comparePrice: number;

  @IsOptional()
  @IsNumber()
  revenue: number;

  @IsOptional()
  @IsNumber()
  margin: number;

  @IsNotEmpty()
  @IsBoolean()
  isPhysical: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isTaxable: boolean;

  @IsNotEmpty()
  @IsBoolean()
  trackStock: boolean;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsNumber()
  productCategoryId: number;
}
