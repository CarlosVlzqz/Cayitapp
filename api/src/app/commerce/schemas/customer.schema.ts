import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'customers' })
export class Customer extends Document {
  @Prop({ required: true, index: true })
  user_id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  instagram: string;

  @Prop()
  phone: string;

  @Prop({ type: [String] })
  preferred_styles: string[];

  @Prop()
  notes: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
