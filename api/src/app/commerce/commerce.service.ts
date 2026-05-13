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

  async createCustomer(data: CreateCustomerDto) {
    return this.customerModel.create(data);
  }

  async getCustomers(user_id: string) {
    return this.customerModel.find({ user_id }).exec();
  }

  async recordSale(data: RecordSaleDto) {
    const sale = await this.saleModel.create(data as any);

    await this.userProductModel.findByIdAndUpdate(data.user_product_id, {
      status: ProductStatus.SOLD,
    });

    return sale;
  }

  async getSalesHistory(user_id: string) {
    return this.saleModel
      .find({ user_id })
      .populate('user_product_id')
      .populate('customer_id')
      .exec();
  }
}
