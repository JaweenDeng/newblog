import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListArticleDTO, CreateCommentDTO } from '../article/article.dto';
import { article, comment, reply } from '../article/article.interface';
import { UserService } from '../user/user.service';
@Injectable()
export class HomeService {
  constructor(
    @InjectModel('article') private readonly articleModel: Model<article>,
    @InjectModel('comment') private readonly commentModel: Model<comment>,
    @InjectModel('reply') private readonly replyModel: Model<reply>,
    private readonly userService: UserService,
  ){}

  // 首页数据
  async getHomeIndex(@Request() req) {
    const life = await this.articleModel.find({type:1, status:1}).limit(8)
    const note = await this.articleModel.find({type:2, status:1}).limit(8)
    const joke = await this.articleModel.find({type:3, status:1}).limit(8)
    const hotReply = await this.articleModel.find({type:4, status:1}).limit(8)
    return {
      life,
      note,
      joke,
      hotReply
    }
  }  

  

  // 热评详情
  async getArticleDetail(id:number) {
    const articles = await this.articleModel.find({id:+id})
    if (articles && articles.length) {
      return articles[0]
    } else {
      return null
    }
  }
  // 文章列表
  async getArticleList(@Request() req, body: ListArticleDTO) {
    const total = await this.articleModel.find({type:body.type, status:1}).count()
    const articles = await this.articleModel.find({type:body.type, status:1}).skip(10*((body.page-1))).limit(body.pageSize || 10)
    return { entry:articles, total}
  }
  // 评论一级列表
  async getFirstComment(id:number) {
    const comments = await this.commentModel.find({articleId:id, parentId:0, status:1})
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
      status:1,
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
      status:1,
    }
    const parentComment = await this.commentModel.find({id:body.parentId, status:1})
    await this.commentModel.updateOne({id:body.parentId}, {replies:parentComment[0]['replies'] ? (parentComment[0]['replies']) +1 : 1})
    const comment = await this.commentModel.create(params)
    return comment ? true : false
  }

  // 评论二级列表
  async getSecordComment(id:number, parentId:number) {
    const comments = await this.commentModel.find({articleId:id, parentId:parentId, status:1})
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

  // 评论一级列表
  async getFirstReply(id:number) {
    const reply = await this.replyModel.find({parentId:0, status:1})
    return reply
  }

  //插入一条一级评论
  async setFirstReply(@Request() req, body: CreateCommentDTO) {
    const { userId, nowTime, id } = await this.beforeReplyCreate(req, true)
    const userItem = await this.userService.findUser(userId)
    let params= {
      ...body,
      userName:userItem[0].surname, 
      createTime:nowTime, 
      id,
      parentId:0,
      status:1,
      replyUserName:null,
      replies:0
    }
    const comment = await this.replyModel.create(params)
    return comment ? true : false
  }
  
  // 插入一条二级评论
  async setSecordReply(@Request() req, body: CreateCommentDTO) {
    const { userId, nowTime, id } = await this.beforeReplyCreate(req, true)
    const userItem = await this.userService.findUser(userId)
    let params= {
      ...body,
      userName:userItem[0].surname, 
      createTime:nowTime, 
      id,
      status:1,
    }
    const parentComment = await this.replyModel.find({id:body.parentId})
    await this.replyModel.updateOne({id:body.parentId}, {replies:parentComment[0]['replies'] ? (parentComment[0]['replies']) +1 : 1})
    const comment = await this.replyModel.create(params)
    return comment ? true : false
  }

  // 评论二级列表
  async getSecordReply(parentId:number) {
    const comments = await this.replyModel.find({parentId:parentId, status:1})
    return comments
  }

  // 插入评论前操作
  async beforeReplyCreate(@Request() req, isCreate:boolean) {
    const userId = await this.userService.getToken(req)
    let nowTime = Number(new Date().getTime())/1000
    nowTime = Math.round(nowTime)
    let id = 0
    if (isCreate) {
      const comments = await this.replyModel.find()
      id = comments.length ? ((+comments[comments.length-1]['id'])+1) : 1 
    }
    return { userId, nowTime, id } 
  }
}
