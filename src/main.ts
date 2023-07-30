import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app); // TODO:running and setup swagger
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
