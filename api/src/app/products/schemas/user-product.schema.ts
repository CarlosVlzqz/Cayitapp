import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProductStatus, Condition } from 'shared-types';

@Schema({ timestamps: true, collection: 'user_products' })
export class UserProduct extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  user_id: string;

  @Prop({
    type: String,
    enum: ProductStatus,
    default: ProductStatus.OWNED,
    index: true,
  })
  status: ProductStatus;

  @Prop({ type: String, enum: Condition })
  condition: Condition;

  @Prop()
  purchase_price: number;

  @Prop()
  selling_price: number;

  @Prop()
  custom_title: string;

  @Prop()
  notes: string;

  // --- Clothing & Accessory Specifics ---
  @Prop()
  size: string;

  @Prop()
  color: string;

  @Prop()
  material: string;

  @Prop()
  season: string;

  // --- Beauty Specifics ---
  @Prop()
  batch_code: string;

  @Prop()
  pao: string;

  @Prop()
  expiration_date: Date;

  // --- Metadata ---
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Tag', index: true })
  tag_ids: MongooseSchema.Types.ObjectId[];

  @Prop({ default: 1 })
  quantity: number;

  @Prop({ default: false })
  is_favorite: boolean;
}

export const UserProductSchema = SchemaFactory.createForClass(UserProduct);
