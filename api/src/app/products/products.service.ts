import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { UserProduct } from './schemas/user-product.schema';
import { Tag } from './schemas/tag.schema';
import { ProductStatus } from 'shared-types';
import { BarcodeLookupService } from './barcode-lookup.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(UserProduct.name) private userProductModel: Model<UserProduct>,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
    private barcodeLookupService: BarcodeLookupService
  ) {}

  async scanByBarcode(barcode: string, user_id: string) {
    let product = await this.productModel.findOne({ barcode }).exec();

    if (!product) {
      const externalData = await this.barcodeLookupService.findProduct(barcode);

      product = await this.productModel.create({
        barcode,
        name: externalData?.name || `Scanned Item (${barcode})`,
        brand: externalData?.brand || 'Unknown',
        category: externalData?.category || 'Uncategorized',
        image_url: externalData?.image_url,
      });
    }

    const existing = await this.userProductModel
      .findOne({ product_id: product._id, user_id } as any)
      .exec();

    if (existing) {
      return existing.populate('product_id');
    }

    const userProduct = await new this.userProductModel({
      product_id: product._id,
      user_id,
      status: ProductStatus.OWNED,
    }).save();

    return userProduct.populate('product_id');
  }

  async updateInventoryItem(id: string, user_id: string, updateDto: any) {
    const item = await this.userProductModel
      .findOneAndUpdate({ _id: id, user_id }, updateDto, { new: true })
      .populate('product_id')
      .populate('tag_ids')
      .exec();

    if (!item) {
      throw new Error('Inventory item not found or unauthorized');
    }

    return item;
  }

  async getUserCloset(user_id: string) {
    return this.userProductModel
      .find({ user_id })
      .populate('product_id')
      .populate('tag_ids')
      .exec();
  }
}
