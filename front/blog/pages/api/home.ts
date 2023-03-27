/*
 * @Author: djw
 * @Description: 前台相关
 */
import Request from '../../utils/request';
import qs from 'qs'
// 获取首页数据
export const getHomeIndex = () => {
  return Request.get(`/api/home/getHomeIndex`)
}
// 获取文章列表数据
export const getArticleList = (params?:any) => {
  return Request.get(`/api/home/getArticleList?${qs.stringify(params)}`)
}

// 获取热评数据
export const getHotPely = (params?:any) => {
  return Request.get(`/api/home/hotReply?${qs.stringify(params)}`)
}

// 获取热评数据
export const getHotPelyDetail = (params?:any) => {
  return Request.get(`/api/home/getArticleDetail?${qs.stringify(params)}`)
}

// 获取一级评论数
export const getFirstComment = (params?:any) => {
  return Request.get(`/api/home/getFirstComment?${qs.stringify(params)}`)
}

// 插入一级评论
export const setFirstCommnet = (params:any) => {
  return Request.post(`/api/home/setFirstCommnet`, params)
}

//插入二级评论
export const setSecordComment = (params:any) => {
  return Request.post(`/api/home/setSecordCommnet`, params)
}

// 获取二级评论
export const getSecordComment = (params:any) => {
  return Request.get(`/api/home/getSecordComment?${qs.stringify(params)}`)
}


// 获取一级留言数
export const getFirstReply = (params?:any) => {
  return Request.get(`/api/home/getFirstReply?${qs.stringify(params)}`)
}

// 插入一级留言数
export const setFirstReply = (params:any) => {
  return Request.post(`/api/home/setFirstReply`, params)
}

//插入二级留言数
export const setSecordReply = (params:any) => {
  return Request.post(`/api/home/setSecordReply`, params)
}

// 获取二级留言数
export const getSecordReply = (params:any) => {
  return Request.get(`/api/home/getSecordReply?${qs.stringify(params)}`)
}


// 统计阅读量
export const setArticleRead = (params:any) => {
  return Request.post(`/home/setArticleRead`, params)
}