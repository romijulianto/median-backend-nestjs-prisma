import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma/error/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*TODO: add validation pipe */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  /* TODO: add error handling prisma */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.setGlobalPrefix('median');
  setupSwagger(app); // TODO:running and setup swagger
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
