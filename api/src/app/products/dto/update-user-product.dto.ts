import { IsEnum, IsNumber, IsOptional, IsString, IsBoolean, IsArray, IsDate } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductStatus, Condition } from 'shared-types';

export class UpdateUserProductDto {
  @ApiPropertyOptional({ enum: ProductStatus, example: ProductStatus.FOR_SALE })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({ enum: Condition, example: Condition.LIKE_NEW })
  @IsOptional()
  @IsEnum(Condition)
  condition?: Condition;

  @ApiPropertyOptional({ example: 1200 })
  @IsOptional()
  @IsNumber()
  purchase_price?: number;

  @ApiPropertyOptional({ example: 2500 })
  @IsOptional()
  @IsNumber()
  selling_price?: number;

  @ApiPropertyOptional({ example: 'My Favorite Sneakers' })
  @IsOptional()
  @IsString()
  custom_title?: string;

  @ApiPropertyOptional({ example: 'Bought at the flagship store' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ type: [String], example: ['tag_id_1'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tag_ids?: string[];

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_favorite?: boolean;

  // --- Clothing & Accessories ---
  @ApiPropertyOptional({ example: 'M' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional({ example: 'Emerald Green' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 'Silk' })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiPropertyOptional({ example: 'SS24' })
  @IsOptional()
  @IsString()
  season?: string;

  // --- Beauty ---
  @ApiPropertyOptional({ example: 'A123' })
  @IsOptional()
  @IsString()
  batch_code?: string;

  @ApiPropertyOptional({ example: '12M' })
  @IsOptional()
  @IsString()
  pao?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiration_date?: Date;
}
