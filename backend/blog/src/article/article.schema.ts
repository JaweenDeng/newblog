/*
 * @Author: djw
 * @Description: 表
 */
import { Schema } from 'mongoose';

// 文章
export const articleSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true},
  description: { type: String },
  type: { type: Number, required: true },
  poster: { type: String },
  content: { type: String },
  sort: { type: Number },
  status: { type: Number },
  createTime:{ type: Number },
  updateTime: { type: Number },
  read:{ type: Number },
  userId:{ type: String, required: true },
});

// 评论
export const commentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  content: { type: String },
  status: { type: Number },
  parentId:{ type: String },
  createTime:{ type: Number },
  replyUserName:{type: String},
  articleId:{type: String},
  userName:{type: String},
  replies:{type: Number}
})



