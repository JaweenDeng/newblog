/*
 * @Author: djw
 * @Description: 用户类型
 */

export interface IResult<T> {
  code:number,
  data?:T,
  message?:string
}

//登录表单类型
export interface ILogin {
  password:string,
  phone:string
}

//注册表单类型
export interface IRegister {
  password:string,
  phone:string,
  email:string,
  surname:string
}