import { NestFactory } from '@nestjs/core';
import{ NestExpressApplication }from'@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/common.Exception';
import config from './config/common.config'
const path = require('path')
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '..', 'public'),{
    prefix: '/static/',   //设置虚拟路径
 }); 
  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter());
  
  
  await app.listen(3001);
}
bootstrap();
