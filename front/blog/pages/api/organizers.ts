/*
 * @Author: djw
 * @Description: 后台相关接口
 */

import Request from '../../utils/request';
import qs from 'qs'
// 文章列表
export const getArticle = (params?:any) => {
  return Request.get(`/article/list?${qs.stringify(params)}`)
}

// 文章保存
export const saveArticle = (params:any) => {
  return Request.post(`/article/add`, params) 
}

// 文章编辑
export const editArticle = (id:string ,params:any) => {
  return Request.post(`/article/edit/${id}`, params)
}

// 文章删除
export const deleteArticle = (id:number) => {
  return Request.post(`/article/delete/${id}`)
}

// 文章详情
export const getArticleDetail = (id:string) => {
  return Request.get(`/article/detail/${id}`)
}

// 文章导入
export const importArticle = (params:any) => {
  return Request.post(`/article/import`, params)
}