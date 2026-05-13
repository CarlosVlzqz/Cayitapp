import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { UserProduct, UserProductSchema } from './schemas/user-product.schema';
import { Tag, TagSchema } from './schemas/tag.schema';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { BarcodeLookupService } from './barcode-lookup.service';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: UserProduct.name, schema: UserProductSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  controllers: [ProductsController, TagsController],
  providers: [ProductsService, BarcodeLookupService, TagsService],
  exports: [MongooseModule, ProductsService, BarcodeLookupService, TagsService],
})
export class ProductsModule {}
