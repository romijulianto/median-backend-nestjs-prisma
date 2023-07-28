import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [PrismaClient], // TODO: import prisma to access from article module
})
export class ArticlesModule {}
