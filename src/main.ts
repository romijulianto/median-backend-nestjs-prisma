import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma/error/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*TODO: add validation pipe */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  /* TODO: add error handling prisma */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  /* TODO: use ClassSerializerInterceptor to remove a field from the response */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('median');
  setupSwagger(app); // TODO:running and setup swagger
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
