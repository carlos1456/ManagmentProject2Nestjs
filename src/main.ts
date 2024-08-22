import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './Common/Filters/http-exception.filter';
import { APP_CONFIG } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const app_config=APP_CONFIG();
  const port=app_config.PORT||3000;
  await app.listen(port);
}
bootstrap();
