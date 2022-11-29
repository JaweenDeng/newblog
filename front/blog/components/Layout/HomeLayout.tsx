/*
 * @Author: djw
 * @Description: 主布局
 */
import React, { useEffect } from 'react'
import { Login } from '@/components/common/Login'
import { getUsers } from '@/pages/api/user'
import { Header } from '@/components/common/Header'
import styles from './css/home.module.scss'
interface Iprops {
  children?:JSX.Element
}
export const HomeLayout:React.FC<Iprops> = (props) => {
  useEffect(() => {
    getUserList()
  }, [])
  const getUserList = async () => {
    const res = await getUsers()
    console.log(res)
  }
  return (
    <div className={styles.layout}>
      <Header />
      <Login />
      {props.children}
    </div>
  )
}