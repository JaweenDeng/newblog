/*
 * @Author: djw
 * @Description: 用户表
 */

import { Schema } from 'mongoose';

export const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  surname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true }
});