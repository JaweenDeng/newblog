/*
 * @Author: djw
 * @Description: 请求
 */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { IResult } from '../types/users'
import qs from 'qs'

const pedding = new Map()
const addPedding = (config:AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancle => {
    if (!pedding.has(url)) {
      pedding.set(url, cancle)
    }
  })
}
const removePedding = (config:AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join('&')
  if(pedding.has(url)) {
    const cancel = pedding.get(url)
    cancel(url)
    pedding.delete(url)
  }
}
const removeAll = () => {
  for (const [url, cancel] of pedding) {
    cancel(url)
  }
  pedding.clear()
}
export class Request {
  instance:AxiosInstance;
  baseConfig:AxiosRequestConfig = { baseURL:'http://localhost:3001' };
  constructor(config:AxiosRequestConfig) {
    this.instance = axios.create({...this.baseConfig, ...config})
    // 请求拦截器
    this.instance.interceptors.request.use((config:AxiosRequestConfig) =>{
      removePedding(config)
      addPedding(config)
      const token = localStorage.getItem('token')
      if (token) {
        config = {
          ...config,
          headers:{
            ...config.headers, 
            Authorization:`Bearer ${token}`
          }
        }
      }
      return config
    }, (err:any) =>{
      return Promise.reject(err)
    })
    // 响应拦截器
    this.instance.interceptors.response.use((res:AxiosResponse) => {
      removePedding(config)
      console.log(res, 'res')
      if (res.data.code === 0) {
        return Promise.resolve(res.data)
      } else {
        if( res.data.message ) {
          message.warn(res.data.message)
        }
        return Promise.resolve(res) 
      }
    }, (error:any) =>{
      console.log(error, 'error')
      if(!error.toString().includes('CanceledError')) {
        if (error && error.message) {
          message.warn(error.message)
        }
        
        // return Promise.reject(error)
      }
    })
  }
  //自定义方法
  public request(config:AxiosRequestConfig):Promise<AxiosResponse> {
    return this.instance.request(config)
  }
  public get<T>(url:string, config?:AxiosRequestConfig):Promise<IResult<T>> {
    return this.instance.get(url, config)
  }
  public post<T>(url:string, data?: any, config?:AxiosRequestConfig):Promise<IResult<T>> {
    return this.instance.post(url, data, config)
  }
}

export default new Request({})