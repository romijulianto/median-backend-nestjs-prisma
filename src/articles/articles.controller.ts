import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  ApiResponse,
  ApiResponseCustomMessage,
} from 'src/common/dto/api-response.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Post articles', description: 'Post new article' })
  @ApiCreatedResponse({ type: ArticleEntity })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all published articles',
    description: 'Return all published articles',
  })
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll(): Promise<ApiResponse<any>> {
    try {
      const data = await this.articlesService.findAll();
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get('drafts')
  @ApiOperation({
    summary: 'Get all draft articles',
    description: 'Return all draft articles',
  })
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts(): Promise<ApiResponse<any>> {
    try {
      const data = await this.articlesService.findDrafts();
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an article by ID',
    description: 'Return a specific article by ID',
  })
  @ApiParam({ name: 'id', description: 'ID of the article', example: '1' })
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<any>> {
    try {
      const data = await this.articlesService.findOne(id);
      if (!data) {
        throw new NotFoundException(
          `${ApiResponseCustomMessage.ARTICLES_NOT_FOUND} ${id}`,
        ).getResponse();
      }
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      throw new NotFoundException(
        `${ApiResponseCustomMessage.ARTICLES_NOT_FOUND} ${id}`,
      ).getResponse();
    }
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    try {
      const data = await this.articlesService.update(id, updateArticleDto);
      if (!data) {
        throw new NotFoundException(
          `${ApiResponseCustomMessage.ARTICLES_NOT_FOUND} ${id}`,
        ).getResponse();
      }
      return new ApiResponse(
        HttpStatus.OK,
        `${ApiResponseCustomMessage.ARTICLES_UPDATE} ${id}`,
        data,
      );
    } catch (error) {
      throw new NotFoundException(
        `${ApiResponseCustomMessage.ARTICLES_NOT_FOUND} ${id}`,
      ).getResponse();
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.articlesService.remove(id);
      if (!data) {
        throw new NotFoundException(
          `${ApiResponseCustomMessage.ARTICLES_NOT_FOUND} ${id}`,
        ).getResponse();
      }
      return new ApiResponse(
        HttpStatus.OK,
        `${ApiResponseCustomMessage.ARTICLES_DELETE} ${id}`,
      );
    } catch (error) {
      throw new NotFoundException(
        `${ApiResponseCustomMessage.ARTICLES_NOT_FOUND} ${id}`,
      ).getResponse();
    }
  }
}
