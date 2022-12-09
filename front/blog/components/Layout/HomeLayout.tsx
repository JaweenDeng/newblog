/*
 * @Author: djw
 * @Description: 主布局
 */
import React, { useEffect } from 'react'
import { Login } from '@/components/common/Login'
import { Header } from '@/components/common/Header'
import styles from './css/home.module.scss'
interface Iprops {
  children?:JSX.Element
}
export const HomeLayout:React.FC<Iprops> = (props) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Login />
      {props.children}
    </div>
  )
}