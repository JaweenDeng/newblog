import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { MongooseModule } from '@nestjs/mongoose';
import { articleSchema, commentSchema, replySchema } from '../article/article.schema';
import { HomeController } from './home.controller';
import { UserModule } from '../user/user.module';
@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'article', schema: articleSchema }]),
    MongooseModule.forFeature([{ name: 'comment', schema: commentSchema }]),
    MongooseModule.forFeature([{ name: 'reply', schema: replySchema }]),
    UserModule
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
