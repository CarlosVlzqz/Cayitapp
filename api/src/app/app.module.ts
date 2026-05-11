import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product, ProductSchema } from './products/schemas/product.schema';
import {
  UserProduct,
  UserProductSchema,
} from './products/schemas/user-product.schema';
import { Tag, TagSchema } from './products/schemas/tag.schema';
import { Customer, CustomerSchema } from './commerce/schemas/customer.schema';
import { Sale, SaleSchema } from './commerce/schemas/sale.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/cayitapp'
    ),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: UserProduct.name, schema: UserProductSchema },
      { name: Tag.name, schema: TagSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Sale.name, schema: SaleSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
