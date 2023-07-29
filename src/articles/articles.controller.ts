import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiResponse, ApiResponseCustomMessage } from 'src/common/dto/api-response.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @ApiOperation({ summary: 'Post articles', description: 'Post new article' })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles', description: 'Return all articles' })
  async findAll(): Promise<ApiResponse<any>> {
    try {
      const data = await this.articlesService.findAll();
      return new ApiResponse(HttpStatus.OK, 'success', data)
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  @Get('drafts')
  async findDrafts(): Promise<ApiResponse<any>> {
    try {
      const data = await this.articlesService.findDrafts();
      return new ApiResponse(HttpStatus.OK, 'success', data)
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article by ID', description: 'Return a specific article by ID' })
  @ApiParam({ name: 'id', description: 'ID of the article', example: '1' })
  async findOne(@Param('id') id: number): Promise<ApiResponse<any>> {
    try {
      const data = await this.articlesService.findOne(+id);
      if(!data) {
        throw new NotFoundException(`${ApiResponseCustomMessage.ARTICLES_NOT_FOUND} ${id}`).getResponse();
      }
      return new ApiResponse(HttpStatus.OK, 'success', data)
    } catch (error) {
      throw new NotFoundException(`${ApiResponseCustomMessage.ARTICLES_NOT_FOUND} ${id}`).getResponse();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
