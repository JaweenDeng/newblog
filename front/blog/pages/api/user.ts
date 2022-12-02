/*
 * @Author: djw
 * @Description: 用户相关接口
 */
import Request from '../../utils/request';
import { ILogin } from '../../types/users';

// 登录接口
export const toLogin = (params:ILogin) => {
  return Request.post(`/user/login`, params)
}
// 注册接口
export const toRegister = (params:ILogin) => {
  return Request.post(`/user/register`, params)
}
// 获取所有用户
export const getUsers = () => {
  return Request.get(`/article/post`)
}

// 上传接口
export const upload = (params:any) => {
  return Request.post(`/article/upload`, params)
}