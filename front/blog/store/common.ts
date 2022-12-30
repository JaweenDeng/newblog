/*
 * @Author: djw
 * @Description: common-store
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from './index'
import { getUserInfo } from '@/pages/api/user'
interface ICommonState {
  showLogin:boolean,
  userInfo:any,
}
const initialState:ICommonState ={
  showLogin:false, //登录弹窗显示
  userInfo:{}, //用户信息
}
export const commonSlice = createSlice({
  name:'common',
  initialState,
  reducers:{
    changeShowLogin:state => {
      state.showLogin = !state.showLogin
    },
    removeUserInfo:state => {
      state.userInfo = {}
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(setUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })
  }
})


// 获取用户信息
export const setUserInfo =  createAsyncThunk('common/getUserInfo', async () =>{
  const res = await getUserInfo()
  return res.data
})

//退出登录，清除token
export const Logout = () => (dispatch:AppDispatch) => {
  localStorage.removeItem('token')
  dispatch(removeUserInfo())
}

// 导出actions
export const {
  changeShowLogin,
  removeUserInfo
} = commonSlice.actions

export default commonSlice.reducer
