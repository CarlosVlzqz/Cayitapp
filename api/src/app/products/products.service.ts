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

  /**
   * Scans a barcode and adds it to the user's closet.
   * If the product doesn't exist in the canonical catalog, it creates a placeholder.
   */
  async scanByBarcode(barcode: string, userId: string) {
    // 1. Find canonical product
    let product = await this.productModel.findOne({ barcode }).exec();

    // 2. If not found, create a placeholder (placeholder for external API logic)
    if (!product) {
      const externalData = await this.barcodeLookupService.findProduct(barcode);

      product = await this.productModel.create({
        barcode,
        name: externalData?.name || `Scanned Item (${barcode})`,
        brand: externalData?.brand || 'Unknown',
        category: externalData?.category || 'Uncategorized',
        imageUrl: externalData?.imageUrl,
      });
    }

    // 3. Check if user already has this item in their closet
    const existing = await (this.userProductModel as any)
      .findOne({ productId: product._id, userId })
      .exec();

    if (existing) {
      return existing.populate('productId');
    }

    // 4. Create a UserProduct instance for the user
    const userProduct = await new this.userProductModel({
      productId: product._id,
      userId,
      status: ProductStatus.OWNED,
    }).save();

    return userProduct.populate('productId');
  }

  /**
   * Updates an existing item in the user's closet.
   */
  async updateInventoryItem(
    id: string,
    userId: string,
    updateDto: any // Use DTO in controller, service handles partial update
  ) {
    const item = await this.userProductModel
      .findOneAndUpdate({ _id: id, userId }, updateDto, { new: true })
      .populate('productId')
      .populate('tagIds')
      .exec();

    if (!item) {
      throw new Error('Inventory item not found or unauthorized');
    }

    return item;
  }

  /**
   * Retrieves all items in a user's closet.
   */
  async getUserCloset(userId: string) {
    return this.userProductModel
      .find({ userId })
      .populate('productId')
      .populate('tagIds')
      .exec();
  }
}
