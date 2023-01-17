/*
 * @Author: djw
 * @Description: 文章接口
 */
import { Document } from 'mongoose';

export interface article extends Document {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly type: number;
  readonly content: string;
  readonly poster: string;
  readonly sort: number;
  readonly userId: string;
  readonly status: number;
  readonly createTime: number,
  readonly updateTime: number,
  readonly read: number,
}

// 列表数组返回
export interface IList {
  entry:article[],
  total:number
}

// 当前时间+文章id+userId ,用于插入数据
export interface IBeforeCreate {
  userId:string, 
  nowTime:number, 
  id?:number
}

// 评论
export interface comment extends Document {
  readonly id: String,
  readonly content: String,
  readonly status: Number,
  readonly parentId:String,
  readonly createTime:Number,
  readonly replyUserName:String,
  readonly articleId:String,
  readonly userName:String
}

// 留言
export interface reply extends Document {
  readonly id: String,
  readonly content: String,
  readonly status: Number,
  readonly parentId:String,
  readonly createTime:Number,
  readonly replyUserName:String,
  readonly userName:String
}