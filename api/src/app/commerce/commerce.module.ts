import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { Sale, SaleSchema } from './schemas/sale.schema';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Sale.name, schema: SaleSchema },
    ]),
    ProductsModule, // Required to access UserProduct model
  ],
  controllers: [CommerceController],
  providers: [CommerceService],
  exports: [MongooseModule, CommerceService],
})
export class CommerceModule {}
