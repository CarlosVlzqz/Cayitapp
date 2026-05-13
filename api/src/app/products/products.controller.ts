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
    return this.productsService.scanByBarcode(scanDto.barcode, scanDto.user_id);
  }

  @Patch('inventory/:id')
  @ApiOperation({ summary: 'Update details of an item in the closet' })
  @ApiQuery({ name: 'user_id', required: true })
  @ApiResponse({ status: 200, description: 'Item successfully updated' })
  async update(
    @Param('id') id: string,
    @Query('user_id') user_id: string,
    @Body() updateDto: UpdateUserProductDto
  ) {
    return this.productsService.updateInventoryItem(id, user_id, updateDto);
  }

  @Get('closet/:user_id')
  @ApiOperation({ summary: 'Retrieve the entire closet of a user' })
  @ApiResponse({ status: 200, description: 'List of items with populated product data' })
  async getCloset(@Param('user_id') user_id: string) {
    return this.productsService.getUserCloset(user_id);
  }
}
