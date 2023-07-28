import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // running and setup swagger
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
