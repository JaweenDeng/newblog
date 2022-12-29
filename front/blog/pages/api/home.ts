/*
 * @Author: djw
 * @Description: 前台相关
 */
import Request from '../../utils/request';
import qs from 'qs'

// 获取热评数据
export const getHotPely = (params?:any) => {
  return Request.get(`/home/hotReply?${qs.stringify(params)}`)
}
