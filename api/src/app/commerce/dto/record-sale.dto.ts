import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SalePlatform } from 'shared-types';

export class RecordSaleDto {
  @ApiProperty({ example: '665f1a2b3c4d5e6f7a8b9c0d' })
  @IsNotEmpty()
  @IsString()
  userProductId: string;

  @ApiProperty({ example: 'user_123' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: 1500 })
  @IsNotEmpty()
  @IsNumber()
  soldPrice: number;

  @ApiProperty({ enum: SalePlatform, example: SalePlatform.INSTAGRAM })
  @IsNotEmpty()
  @IsEnum(SalePlatform)
  platform: SalePlatform;

  @ApiPropertyOptional({ example: '665f1a2b3c4d5e6f7a8b9c0e' })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiPropertyOptional({ example: 80 })
  @IsOptional()
  @IsNumber()
  shippingFee?: number;

  @ApiPropertyOptional({ example: 150 })
  @IsOptional()
  @IsNumber()
  platformFee?: number;

  @ApiPropertyOptional({ example: 'Shipped via DHL' })
  @IsOptional()
  @IsString()
  notes?: string;
}
