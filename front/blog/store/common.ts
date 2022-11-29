/*
 * @Author: djw
 * @Description: common-store
 */
import { createSlice } from '@reduxjs/toolkit'
interface ICommonState {
  showLogin:boolean
}
const initialState:ICommonState ={
  showLogin:false //登录弹窗显示
}
export const commonSlice = createSlice({
  name:'common',
  initialState,
  reducers:{
    changeShowLogin:state => {
      state.showLogin = !state.showLogin
    }
  }
})

// 导出actions
export const {
  changeShowLogin
} = commonSlice.actions

export default commonSlice.reducer
