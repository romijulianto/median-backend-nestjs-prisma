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
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  ApiResponse,
  ApiResponseCustomMessage,
} from 'src/common/dto/api-response.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post articles', description: 'Post new article' })
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ApiResponse<any>> {
    try {
      const data = new ArticleEntity(
        await this.articlesService.create(createArticleDto),
      );
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all published articles',
    description: 'Return all published articles',
  })
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll(): Promise<ApiResponse<any>> {
    try {
      const articles = await this.articlesService.findAll();
      const data = articles.map((article) => new ArticleEntity(article));
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get('drafts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all draft articles',
    description: 'Return all draft articles',
  })
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts(): Promise<ApiResponse<any>> {
    try {
      const drafts = await this.articlesService.findDrafts();
      const data = drafts.map((draft) => new ArticleEntity(draft));
      return new ApiResponse(HttpStatus.OK, 'success', data);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
      const data = new ArticleEntity(await this.articlesService.findOne(id));
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ApiResponse<any>> {
    try {
      const data = new ArticleEntity(
        await this.articlesService.update(id, updateArticleDto),
      );
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<any>> {
    try {
      const data = new ArticleEntity(await this.articlesService.remove(id));
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
