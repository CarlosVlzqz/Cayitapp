import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'products' })
export class Product extends Document {
  @Prop({ required: true, unique: true, index: true })
  barcode: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  brand: string;

  @Prop()
  category: string;

  @Prop()
  image_url: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
