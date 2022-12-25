/*
 * @Author: djw
 * @Description: 主布局
 */
import React, { useEffect } from 'react'
import { Login } from '@/components/common/Login'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { useAppDispatch } from '@/store/hooks'
import { setUserInfo } from '@/store/common'
import styles from './css/home.module.scss'
interface Iprops {
  children?:JSX.Element
}
export const HomeLayout:React.FC<Iprops> = (props) => {
  const dispatch  = useAppDispatch()
  useEffect(() =>{
    dispatch(setUserInfo())
  }, [])
  return (
    <div className={styles.layout}>
      <Header />
      <Login />
      <div className={styles.main}>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}