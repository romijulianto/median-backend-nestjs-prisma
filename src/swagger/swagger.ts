import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    // setting up swagger api/documentation
    const config = new DocumentBuilder()
        .setTitle('Median')
        .setDescription('The Median API description')
        .setVersion('0.1')
        .setBasePath('api/doc')
        .setContact('Romi Julianto', 'https://www.linkedin.com/in/romijulianto/', 'romyjulians@gmail.com')
        .build()

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            deepLinking: true,
            explorer: true,
            customCss: '',
            customJs: '',
            docExpansion: 'full',
            defaultModelsExpandDepth: -1,
            displayRequestDuration: true,
            displayOperationId: false,
            filter: true,
            showExtensions: true,
            showCommonExtensions: true,
            operationsSorter: 'alpha',
            tagsSorter: 'alpha',
        },
    })
}
