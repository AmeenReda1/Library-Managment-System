import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const configService: ConfigService = app.get(ConfigService);
  console.log(configService.get<number>('PORT'));
  const port: number = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
