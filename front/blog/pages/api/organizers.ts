/*
 * @Author: djw
 * @Description: 后台相关接口
 */

import Request from '../../utils/request';

// 文章列表
export const getArticle = (params?:any) => {
  return Request.get(`/article/list`, params)
}

// 文章保存
export const saveArticle = (params:any) => {
  return Request.post(`/article/save`, params)
}