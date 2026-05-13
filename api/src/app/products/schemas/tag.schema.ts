import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TagType } from 'shared-types';

@Schema({ timestamps: true, collection: 'tags' })
export class Tag extends Document {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ type: String, enum: TagType, required: true, index: true })
  type: TagType;

  @Prop({ index: true })
  user_id: string;

  @Prop()
  color: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
