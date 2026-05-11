import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { SalePlatform } from 'shared-types';

@Schema({ timestamps: true })
export class Sale extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UserProduct', required: true })
  userProductId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', index: true })
  customerId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  userId: string; // The owner of this sale

  @Prop({ required: true })
  soldPrice: number;

  @Prop({ type: String, enum: SalePlatform, default: SalePlatform.OTHER })
  platform: SalePlatform;

  @Prop({ default: Date.now })
  soldDate: Date;

  @Prop()
  shippingFee: number;

  @Prop()
  platformFee: number;

  @Prop()
  notes: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
