import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListArticleDTO, CreateCommentDTO } from '../article/article.dto';
import { article, comment } from '../article/article.interface';
import { UserService } from '../user/user.service';
@Injectable()
export class HomeService {
  constructor(
    @InjectModel('article') private readonly articleModel: Model<article>,
    @InjectModel('comment') private readonly commentModel: Model<comment>,
    private readonly userService: UserService,
  ){}

  // 热评列表
  async getHotPely(@Request() req, body: ListArticleDTO) {
    const total = await this.articleModel.find({type:4}).count()
    const articles = await this.articleModel.find({type:4}).skip(10*((body.page-1))).limit(body.pageSize || 10)
    return { entry:articles, total}
  }

  // 热评详情
  async getHotPelyDetail(id:number) {
    const articles = await this.articleModel.find({id:+id})
    if (articles && articles.length) {
      return articles[0]
    } else {
      return null
    }
  }

  // 评论一级列表
  async getFirstComment(id:number) {
    const comments = await this.commentModel.find({articleId:id, parentId:0})
    return comments
  }

  //插入一条一级评论
  async setFirstCommnet(@Request() req, body: CreateCommentDTO) {
    const { userId, nowTime, id } = await this.beforeCreate(req, true)
    const userItem = await this.userService.findUser(userId)
    let params= {
      ...body,
      userName:userItem[0].surname, 
      createTime:nowTime, 
      id,
      parentId:0,
      status:0,
      replyUserName:null,
      replies:0
    }
    const comment = await this.commentModel.create(params)
    return comment ? true : false
  }
  
  // 插入一条二级评论
  async setSecordCommnet(@Request() req, body: CreateCommentDTO) {
    const { userId, nowTime, id } = await this.beforeCreate(req, true)
    const userItem = await this.userService.findUser(userId)
    let params= {
      ...body,
      userName:userItem[0].surname, 
      createTime:nowTime, 
      id,
      status:0,
    }
    const parentComment = await this.commentModel.find({id:body.parentId})
    await this.commentModel.updateOne({id:body.parentId}, {replies:parentComment[0]['replies'] ? (parentComment[0]['replies']) +1 : 1})
    const comment = await this.commentModel.create(params)
    return comment ? true : false
  }

  // 评论二级列表
  async getSecordComment(id:number, parentId:number) {
    const comments = await this.commentModel.find({articleId:id, parentId:parentId})
    return comments
  }

  // 插入评论前操作
  async beforeCreate(@Request() req, isCreate:boolean) {
    const userId = await this.userService.getToken(req)
    let nowTime = Number(new Date().getTime())/1000
    nowTime = Math.round(nowTime)
    let id = 0
    if (isCreate) {
      const comments = await this.commentModel.find()
      id = comments.length ? ((+comments[comments.length-1]['id'])+1) : 1 
    }
    return { userId, nowTime, id } 
  }
}
