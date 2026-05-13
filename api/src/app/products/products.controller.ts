import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ScanBarcodeDto } from './dto/scan-barcode.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('scan')
  @ApiOperation({ summary: 'Scan a barcode and add it to the user closet' })
  @ApiResponse({ status: 201, description: 'Product successfully added or returned' })
  async scan(@Body() scanDto: ScanBarcodeDto) {
    return this.productsService.scanByBarcode(scanDto.barcode, scanDto.userId);
  }

  @Patch('inventory/:id')
  @ApiOperation({ summary: 'Update details of an item in the closet' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({ status: 200, description: 'Item successfully updated' })
  async update(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() updateDto: UpdateUserProductDto
  ) {
    return this.productsService.updateInventoryItem(id, userId, updateDto);
  }

  @Get('closet/:userId')
  @ApiOperation({ summary: 'Retrieve the entire closet of a user' })
  @ApiResponse({ status: 200, description: 'List of items with populated product data' })
  async getCloset(@Param('userId') userId: string) {
    return this.productsService.getUserCloset(userId);
  }
}
