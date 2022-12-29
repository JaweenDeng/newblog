import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { MongooseModule } from '@nestjs/mongoose';
import { articleSchema } from '../article/article.schema';
import { HomeController } from './home.controller';
@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'article', schema: articleSchema }]),
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
