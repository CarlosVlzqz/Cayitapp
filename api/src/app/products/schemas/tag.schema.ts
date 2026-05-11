import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TagType } from 'shared-types';

@Schema({ timestamps: true })
export class Tag extends Document {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ type: String, enum: TagType, required: true, index: true })
  type: TagType;

  @Prop({ index: true })
  userId: string; // Optional: null for global tags, UID for user-specific tags

  @Prop()
  color: string; // For UI visualization
}

export const TagSchema = SchemaFactory.createForClass(Tag);
