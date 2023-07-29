import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiResponse, ApiResponseCustomMessage } from 'src/common/dto/api-response.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
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
  async findOne(@Param('id') id: number): Promise<ApiResponse<any>> {
    try {
      const data = await this.articlesService.findOne(+id);
      if(data === null) {
        return new ApiResponse(HttpStatus.OK, ApiResponseCustomMessage.ARTICLES_NOT_FOUND)
      } else {
        return new ApiResponse(HttpStatus.OK, 'success', data)
      }
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
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
