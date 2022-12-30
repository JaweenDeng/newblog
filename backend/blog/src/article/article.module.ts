/*
 * @Author: djw
 * @Description: 文章管理
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { articleSchema, commentSchema } from './article.schema'; 
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'article', schema: articleSchema }]),
    MongooseModule.forFeature([{ name: 'comment', schema: commentSchema }]),
    UserModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService,],
  exports: [] 
})
export class ArticleModule {}