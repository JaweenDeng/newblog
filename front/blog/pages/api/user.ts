/*
 * @Author: djw
 * @Description: 用户相关接口
 */
import Request from '../../utils/request';
import { ILogin } from '../../types/users';

// 登录接口
export const toLogin = (params:ILogin) => {
  return Request.post(`/api/user/login`, params)
}
// 注册接口
export const toRegister = (params:ILogin) => {
  return Request.post(`/api/user/register`, params)
}

// 上传接口
export const upload = (params:any) => {
  return Request.post(`/api/article/upload`, params)
}

// 获取用户信息
export const getUserInfo = () => {
  return Request.post(`/api/user/getUserInfo`)
}