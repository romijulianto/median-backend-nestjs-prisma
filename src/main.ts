import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*TODO: add validation pipe */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('median');
  setupSwagger(app); // TODO:running and setup swagger
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
