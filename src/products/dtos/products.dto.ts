import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsInt,
  IsArray,
  Min,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @IsInt()
  readonly brandId: number;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @ValidateIf((item) => item.maxPrice)
  @Min(0)
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @Min(0)
  maxPrice: number;
}
