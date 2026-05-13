import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommerceService } from './commerce.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { RecordSaleDto } from './dto/record-sale.dto';

@ApiTags('commerce')
@Controller('commerce')
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Post('customers')
  @ApiOperation({ summary: 'Create a new customer profile' })
  @ApiResponse({ status: 201, description: 'Customer created' })
  async createCustomer(@Body() data: CreateCustomerDto) {
    return this.commerceService.createCustomer(data);
  }

  @Get('customers')
  @ApiOperation({ summary: 'Get all customers for a user' })
  @ApiResponse({ status: 200, description: 'List of customers' })
  async getCustomers(@Query('userId') userId: string) {
    return this.commerceService.getCustomers(userId);
  }

  @Post('sales')
  @ApiOperation({ summary: 'Record a sale and mark item as SOLD' })
  @ApiResponse({ status: 201, description: 'Sale recorded' })
  async recordSale(@Body() data: RecordSaleDto) {
    return this.commerceService.recordSale(data);
  }

  @Get('sales')
  @ApiOperation({ summary: 'Get sales history for a user' })
  @ApiResponse({ status: 200, description: 'Sales history' })
  async getSales(@Query('userId') userId: string) {
    return this.commerceService.getSalesHistory(userId);
  }
}
