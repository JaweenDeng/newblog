import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateArticleDTO, ListArticleDTO } from './article.dto';
import { article, IList, IBeforeCreate, comment } from './article.interface';
import * as ExcelJS from 'exceljs';
@Injectable()
export class ArticleService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('article') private readonly articleModel: Model<article>,
    @InjectModel('comment') private readonly commentModel: Model<comment>,
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
    const { userId, nowTime, id } = await this.beforeCreate(req, true)
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
  
  // excel导入数据
  async importExcel(@Request() req, buffer:any):Promise<boolean>{
    const { userId, nowTime, id } = await this.beforeCreate(req, true)
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer) // 加载buffer文件
    const worksheet = workbook.getWorksheet(1); // 获取excel表格的第一个sheet
    const result = [];
    const arr = []
    worksheet.eachRow((row, rowNumber) => {
      // 第一行是表头，故从第二行获取数据
      if (rowNumber > 1) {
        const target = {
          userId,
          read:0,
          sort:0,
          createTime:nowTime, 
          updateTime:nowTime,
          id:id + rowNumber
        }
        row.eachCell((cell, colNumber) => {
          arr[colNumber] && (target[arr[colNumber-1]] = cell.value)
        });
        result.push(target);
      } else {
        row.eachCell((cell, colNumber) => {
          arr.push(cell.value)
        });
      }
    })
    const article = await this.articleModel.insertMany(result)
    return article ? true : false
  }

  // 新建文章前操作
  async beforeCreate(@Request() req, isCreate:boolean):Promise<IBeforeCreate> {
    const userId = await this.userService.getToken(req)
    let nowTime = Number(new Date().getTime())/1000
    nowTime = Math.round(nowTime)
    let id = 0
    if (isCreate) {
      const articles = await this.articleModel.find()
      id = articles.length ? ((+articles[articles.length-1]['id'])+1) : 1 
    }
    return { userId, nowTime, id } 
  }

  // 评论列表
  async getCommentList (@Request() req, body: ListArticleDTO) {
    const total = await this.commentModel.find().count()
    const articles = await this.commentModel.find().skip(10*((body.page-1))).limit(body.pageSize || 10)
    return { entry:articles, total}
  }

  // 删除评论
  async deleteComment(id: string): Promise<boolean> {
    const articles = await this.commentModel.deleteOne({id})
    return articles ? true : false
  }
}
