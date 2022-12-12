/*
 * @Descripttion: 
 * @version: 
 * @Author: JW
 * @Date: 2022-12-05 19:56:58
 */
/*
 * @Author: djw
 * @Description: 头部组件
 */
import Link from 'next/link';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './css/Header.module.scss';
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
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className={styles.txt}>DENG BLOG</span>
      </Link>
      <Menu mode="horizontal" items={items} />
      <button className={styles.userInfo}>
        <UserOutlined />
      </button>
    </header>
  )
}