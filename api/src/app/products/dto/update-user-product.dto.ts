import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
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
  purchasePrice?: number;

  @ApiPropertyOptional({ example: 2500 })
  @IsOptional()
  @IsNumber()
  sellingPrice?: number;

  @ApiPropertyOptional({ example: 'My Favorite Sneakers' })
  @IsOptional()
  @IsString()
  customTitle?: string;

  @ApiPropertyOptional({ example: 'Bought this at the flagship store' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ type: [String], example: ['tag_id_1'] })
  @IsOptional()
  @IsString({ each: true })
  tagIds?: string[];

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
  batchCode?: string;

  @ApiPropertyOptional({ example: '12M' })
  @IsOptional()
  @IsString()
  pao?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional()
  expirationDate?: Date;
}
