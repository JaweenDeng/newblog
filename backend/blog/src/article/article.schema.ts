/*
 * @Author: djw
 * @Description: 表
 */
import { Schema } from 'mongoose';

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



