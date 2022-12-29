/*
 * @Author: djw
 * @Description: 头部组件
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import styles from './css/Header.module.scss';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { changeShowLogin, Logout } from '@/store/common'
import { store } from '@/store'
import { UserInfo } from '@/components/common/UserInfo'
import Router, { useRouter } from 'next/router'
export const Header = () => {
  const router = useRouter()
  const [current, setCurrent] = useState(router.pathname)
  const handleSelect = (row:any) => {
    setCurrent(row.key)
    Router.push({
      pathname:row.key
    })
  }
  const items:MenuProps['items'] = [
    {
      label: '首页',
      key: '/'
    },
    {
      label: '笔记',
      key: '/note'
    },
    {
      label: '热评',
      key: '/hotReply'
    },
    {
      label: '笑话',
      key: '/joke'
    },
    {
      label: '生活',
      key: '/life'
    },
    {
      label:'留言',
      key:'/comment'
    },
    {
      label:'关于我',
      key:'/about'
    },
  ]
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className={styles.txt}>DENG BLOG</span>
      </Link>
      <Menu mode="horizontal" items={items} selectedKeys={[current]} onSelect={(item) => handleSelect(item)} />
      <div className={styles.userInfo}>
        <UserInfo />
      </div>
    </header>
  )
}