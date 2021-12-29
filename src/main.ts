import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('api-apero-bar')
    .setDescription('api-apero-bar-app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
