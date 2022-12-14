/*
 * @Author: djw
 * @Description: 头部组件
 */
import { useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import styles from './css/Header.module.scss';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { changeShowLogin, Logout } from '@/store/common'
import { store } from '@/store'
export const Header = () => {
  const items:MenuProps['items'] = [
    {
      label: '首页',
      key: 'index'
    },
    {
      label: '生活',
      key: 'life'
    },
    {
      label: '归档',
      key: 'arrange'
    },
    {
      label: '关于',
      key: 'about'
    },
    {
      label:'留言',
      key:'comment'
    }
  ]
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(state => state.common.userInfo)
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className={styles.txt}>DENG BLOG</span>
      </Link>
      <Menu mode="horizontal" items={items} />
      {
        userInfo?.surname ? 
        <div className={styles.userInfo} onClick={() => dispatch(Logout())}>
          {`欢迎，${userInfo?.surname}` }
        </div>
        : <div className={styles.userInfo} onClick={() => dispatch(changeShowLogin())}>
          登录
        </div>
      }

      
    </header>
  )
}