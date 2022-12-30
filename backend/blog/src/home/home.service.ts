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

  // 热评列表
  async getHotPely(@Request() req, body: ListArticleDTO) {
    const total = await this.articleModel.find({type:4}).count()
    const articles = await this.articleModel.find({type:4}).skip(10*((body.page-1))).limit(body.pageSize || 10)
    return { entry:articles, total}
  }

  // 热评详情
  async getHotPelyDetail(id:number) {
    const articles = await this.articleModel.find({id:id})
    if (articles && articles.length) {
      return articles[0]
    } else {
      return null
    }
  }
}
