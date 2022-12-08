import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateArticleDTO } from './article.dto';
import { article } from './article.interface';
@Injectable()
export class ArticleService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('article') private readonly articleModel: Model<article>
  ){}

  // 文章列表列表
  async getArticleList (@Request() req, body: CreateArticleDTO): Promise<article[]> {
    const userId = await this.userService.getToken(req)
    const articles = await this.articleModel.find({userId})
    return articles
  }

  // 保存文章
  async saveArticle(@Request() req, body: CreateArticleDTO): Promise<boolean> {
    const userId = await this.userService.getToken(req)
    let nowTime = Number(new Date().getTime())/1000
    nowTime = Math.round(nowTime)
    let params= {
      ...body,
      read:0,
      userId, 
      createTime:nowTime, 
      updateTime:nowTime,
    }
    let id = body.id
    if (!body.id) {
      const articles = await this.articleModel.find()
      id = articles.length ? articles[articles.length]['id'] : 1 
    } else {
      delete params.createTime
      delete params.read
    }
    const article = await this.articleModel.create(params)
    return article ? true : false
  }
}
