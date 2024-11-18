import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true,
      // whitelist: true,
      // forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
