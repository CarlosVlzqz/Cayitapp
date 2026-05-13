import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './schemas/tag.schema';
import { TagType } from 'shared-types';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async create(data: { name: string; type: TagType; user_id?: string; color?: string }) {
    return this.tagModel.create(data);
  }

  async findAllForUser(user_id: string) {
    return this.tagModel
      .find({ $or: [{ user_id }, { user_id: null }] })
      .exec();
  }

  async delete(id: string, user_id: string) {
    const result = await this.tagModel.deleteOne({ _id: id, user_id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Tag not found or unauthorized');
    }
    return { success: true };
  }
}
