import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProductStatus, Condition } from 'shared-types';

@Schema({ timestamps: true })
export class UserProduct extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  userId: string; // Firebase UID or similar

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
  purchasePrice: number;

  @Prop()
  sellingPrice: number;

  @Prop()
  customTitle: string;

  @Prop()
  notes: string;

  // --- Clothing & Accessory Specifics ---
  @Prop()
  size: string; // e.g., "M", "32x30", "9.5 US"

  @Prop()
  color: string;

  @Prop()
  material: string; // e.g., "100% Cotton", "Leather"

  @Prop()
  season: string; // e.g., "FW24", "Summer"

  // --- Beauty Specifics ---
  @Prop()
  batchCode: string;

  @Prop()
  pao: string; // Period After Opening (e.g., "12M")

  @Prop()
  expirationDate: Date;

  // --- Metadata ---
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Tag', index: true })
  tagIds: MongooseSchema.Types.ObjectId[];

  @Prop({ default: 1 })
  quantity: number;

  @Prop({ default: false })
  isFavorite: boolean;
}

export const UserProductSchema = SchemaFactory.createForClass(UserProduct);
