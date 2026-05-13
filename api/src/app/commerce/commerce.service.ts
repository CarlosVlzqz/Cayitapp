import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { Sale } from './schemas/sale.schema';
import { UserProduct } from '../products/schemas/user-product.schema';
import { ProductStatus } from 'shared-types';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { RecordSaleDto } from './dto/record-sale.dto';

@Injectable()
export class CommerceService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    @InjectModel(UserProduct.name) private userProductModel: Model<UserProduct>
  ) {}

  /**
   * Customers (CRM)
   */
  async createCustomer(data: CreateCustomerDto) {
    return this.customerModel.create(data);
  }

  async getCustomers(userId: string) {
    return this.customerModel.find({ userId }).exec();
  }

  /**
   * Sales tracking
   */
  async recordSale(data: RecordSaleDto) {
    // 1. Record the sale
    const sale = await this.saleModel.create(data as any);

    // 2. Update the product status to SOLD
    await this.userProductModel.findByIdAndUpdate(data.userProductId, {
      status: ProductStatus.SOLD,
    });

    return sale;
  }

  async getSalesHistory(userId: string) {
    return this.saleModel
      .find({ userId })
      .populate('userProductId')
      .populate('customerId')
      .exec();
  }
}
