import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScanBarcodeDto {
  @ApiProperty({ example: '7501055300075' })
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @ApiProperty({ example: 'user_123' })
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
