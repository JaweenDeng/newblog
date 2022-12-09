import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateArticleDTO, ListArticleDTO } from './article.dto';
import { article, IList } from './article.interface';

@Injectable()
export class ArticleService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('article') private readonly articleModel: Model<article>
  ){}

  // 文章列表列表
  async getArticleList (@Request() req, body: ListArticleDTO): Promise<IList> {
    const userId = await this.userService.getToken(req)
    const total = await this.articleModel.find({userId}).count()
    const articles = await this.articleModel.find({userId}).skip(10*((body.page-1))).limit(body.pageSize || 10)
    return { entry:articles, total}
  }

  // 新增文章
  async addArticle(@Request() req, body: CreateArticleDTO): Promise<boolean> {
    const userId = await this.userService.getToken(req)
    let nowTime = Number(new Date().getTime())/1000
    nowTime = Math.round(nowTime)
    const articles = await this.articleModel.find()
    console.log(body.status)
    const id = articles.length ? ((+articles[articles.length-1]['id'])+1) : 1 
    let params= {
      ...body,
      read:0,
      userId, 
      createTime:nowTime, 
      updateTime:nowTime,
      id
    }
    const article = await this.articleModel.create(params)
    return article ? true : false
  }
  // 获取单个文章详情
  async getArticleDetail(id: string):Promise<article[]> {
    const articles = await this.articleModel.find({id})
    return articles
  }

  // 编辑文章
  async updateArticle(id: string, body: CreateArticleDTO):Promise<boolean> {
    let nowTime = Number(new Date().getTime())/1000
    nowTime = Math.round(nowTime)
    const article = await this.articleModel.updateOne({id}, {...body, updateTime:nowTime})
    return article ? true : false
  }

  // 删除文章
  async deleteArticle(id: string): Promise<boolean> {
    const articles = await this.articleModel.deleteOne({id})
    return articles ? true : false
  }
  
}
