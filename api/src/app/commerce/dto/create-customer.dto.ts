import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'user_123' })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ example: 'María López' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '@marialopez' })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({ example: '+521234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ type: [String], example: ['streetwear', 'vintage'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferred_styles?: string[];

  @ApiPropertyOptional({ example: 'Regular buyer, prefers size M' })
  @IsOptional()
  @IsString()
  notes?: string;
}
