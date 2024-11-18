import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        // const error_text = errors.map((error) => ({
        //   property: error.property,
        //   message: error.constraints[Object.keys(error.constraints)[0]],
        // }));
        const error_text = JSON.stringify(
          errors.map(
            (error) => error.constraints[Object.keys(error.constraints)[0]],
          ),
        );
        const result = { success: false, result: { error: error_text } };
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
