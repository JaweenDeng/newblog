/*
 * @Author: djw
 * @Description: 公共工具方法
 */

/**
 * @description:时间戳转时间格式 
 * @param {number}: time 10位时间戳
 * @return {*}: 转换后的时间格式
 */
export const changeTime = (timestamp:number):string => {
  const date = new Date(timestamp * 1000) 
  const year = date.getFullYear() 
  const month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) 
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const secord = date.getSeconds()
  return `${year}-${month}-${month} ${hour}:${min}:${secord}`
}