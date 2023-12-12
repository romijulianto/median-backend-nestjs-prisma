import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  // TODO: setting up swagger api/documentation
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('1.0')
    .addTag('articles', 'endpoint for article transaction')
    .addTag('users', 'endpoint for users transaction')
    .addTag('auth', 'endpoint for auth get token')
    .setBasePath('api/docs')
    .addBearerAuth()
    .addServer('https://api.romijulianto.my.id/', 'HTTPS')
    .addServer('http://localhost:3001/', 'HTTP')
    .setContact(
      'Romi Julianto',
      'https://www.linkedin.com/in/romijulianto/',
      'romyjulians@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      displayRequestDuration: true,
      filter: true,
    },
    customSiteTitle: 'Median Backend',
    swaggerUrl: 'http://localhost:3001/median/api/docs/',
    explorer: true,
    url: 'http://localhost:3001/',
    useGlobalPrefix: true,
    customCss: '',
    customCssUrl: '',
    customJs: '',
    customJsStr: '',
    customfavIcon: '',
    validatorUrl: '',
    jsonDocumentUrl: '',
    yamlDocumentUrl: '',
  });
}
