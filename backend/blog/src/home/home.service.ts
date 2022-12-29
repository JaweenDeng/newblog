import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListArticleDTO } from '../article/article.dto';
import { article } from '../article/article.interface';
@Injectable()
export class HomeService {
  constructor(
    @InjectModel('article') private readonly articleModel: Model<article>
  ){}


  async getHotPely(@Request() req, body: ListArticleDTO) {
    const total = await this.articleModel.find({type:4}).count()
    const articles = await this.articleModel.find({type:4}).skip(10*((body.page-1))).limit(body.pageSize || 10)
    return { entry:articles, total}
  }
}
