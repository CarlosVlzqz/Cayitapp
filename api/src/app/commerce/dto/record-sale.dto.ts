import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SalePlatform } from 'shared-types';

export class RecordSaleDto {
  @ApiProperty({ example: '665f1a2b3c4d5e6f7a8b9c0d' })
  @IsNotEmpty()
  @IsString()
  user_product_id: string;

  @ApiProperty({ example: 'user_123' })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ example: 1500 })
  @IsNotEmpty()
  @IsNumber()
  sold_price: number;

  @ApiProperty({ enum: SalePlatform, example: SalePlatform.INSTAGRAM })
  @IsNotEmpty()
  @IsEnum(SalePlatform)
  platform: SalePlatform;

  @ApiPropertyOptional({ example: '665f1a2b3c4d5e6f7a8b9c0e' })
  @IsOptional()
  @IsString()
  customer_id?: string;

  @ApiPropertyOptional({ example: 80 })
  @IsOptional()
  @IsNumber()
  shipping_fee?: number;

  @ApiPropertyOptional({ example: 150 })
  @IsOptional()
  @IsNumber()
  platform_fee?: number;

  @ApiPropertyOptional({ example: 'Shipped via DHL' })
  @IsOptional()
  @IsString()
  notes?: string;
}
