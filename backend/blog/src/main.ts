import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/common.Exception';
import config from './config/common.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(3001);
}
bootstrap();
