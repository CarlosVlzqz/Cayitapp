import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ required: true, index: true })
  userId: string; // The owner of this customer record

  @Prop({ required: true })
  name: string;

  @Prop()
  instagram: string;

  @Prop()
  phone: string;

  @Prop({ type: [String] })
  preferredStyles: string[];

  @Prop()
  notes: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
