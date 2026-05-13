import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './schemas/tag.schema';
import { TagType } from 'shared-types';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  /**
   * Creates a new tag.
   */
  async create(data: { name: string; type: TagType; userId?: string; color?: string }) {
    return this.tagModel.create(data);
  }

  /**
   * Retrieves all tags available to a user (user-specific + global).
   */
  async findAllForUser(userId: string) {
    return this.tagModel
      .find({
        $or: [{ userId: userId }, { userId: null }],
      })
      .exec();
  }

  /**
   * Deletes a tag if it belongs to the user.
   */
  async delete(id: string, userId: string) {
    const result = await this.tagModel.deleteOne({ _id: id, userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Tag not found or unauthorized');
    }
    return { success: true };
  }
}
