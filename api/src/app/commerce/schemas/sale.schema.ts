import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { SalePlatform } from 'shared-types';

@Schema({ timestamps: true, collection: 'sales' })
export class Sale extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UserProduct', required: true })
  user_product_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', index: true })
  customer_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  user_id: string;

  @Prop({ required: true })
  sold_price: number;

  @Prop({ type: String, enum: SalePlatform, default: SalePlatform.OTHER })
  platform: SalePlatform;

  @Prop({ default: Date.now })
  sold_date: Date;

  @Prop()
  shipping_fee: number;

  @Prop()
  platform_fee: number;

  @Prop()
  notes: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
