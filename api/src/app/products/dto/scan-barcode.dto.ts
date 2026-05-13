import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScanBarcodeDto {
  @ApiProperty({ example: '7501055300075', description: 'The barcode of the product to scan' })
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @ApiProperty({ example: 'user_123', description: 'The UID of the user scanning the product' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
