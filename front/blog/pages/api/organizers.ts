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

// 评论列表 deleteComment
export const getCommentList = (params?:any) => {
  return Request.get(`/article/CommentList?${qs.stringify(params)}`)
}

// 评论删除
export const deleteComment = (id:number, params:any) => {
  return Request.post(`/article/deleteComment/${id}`, params)
}

// 评论状态
export const updateComment = (params:any) => {
  return Request.post(`/article/updateComment`, params)
}

// 留言列表 getReplyList
export const getReplyList = (params?:any) => {
  return Request.get(`/article/getReplyList?${qs.stringify(params)}`)
}

// 留言删除
export const deleteReply = (id:number, params:any) => {
  return Request.post(`/article/deleteReply/${id}`, params)
}

// 留言状态
export const updateReply = (params:any) => {
  return Request.post(`/article/updateReply`, params)
}


// 用户列表
export const getUserList = (params:any) => {
  return Request.get(`/user/users`, params)
}

// 用户状态
export const updateUser = (params:any) => {
  return Request.post(`/user/updateUser`, params)
}

// 删除用户
export const deleteUser = (params:any) => {
  return Request.post(`/user/deleteUser`, params)
}