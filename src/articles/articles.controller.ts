import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  async findAll() {
    try {
      const data = await this.articlesService.findAll();
      return {
        status: 200,
        message: "success",
        data: data
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message
      };
    }
  }

  @Get('drafts')
  async findDrafts() {
    try {
      const data = await this.articlesService.findDrafts();
      return {
        status: 200,
        message: "success",
        data: data
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message
      };
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
