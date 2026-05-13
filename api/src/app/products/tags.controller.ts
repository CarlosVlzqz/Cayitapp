import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { TagType } from 'shared-types';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({ status: 201, description: 'Tag successfully created' })
  async create(
    @Body()
    data: {
      name: string;
      type: TagType;
      userId?: string;
      color?: string;
    }
  ) {
    return this.tagsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Find all tags available to a user' })
  @ApiResponse({ status: 200, description: 'List of tags' })
  async findAll(@Query('userId') userId: string) {
    return this.tagsService.findAllForUser(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiResponse({ status: 200, description: 'Tag deleted' })
  async delete(@Param('id') id: string, @Query('userId') userId: string) {
    return this.tagsService.delete(id, userId);
  }
}
