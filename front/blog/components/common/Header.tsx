/*
 * @Author: djw
 * @Description: 头部组件
 */
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
      <div className={styles.logo}>
        DENG
      </div>
      <Menu mode="horizontal" items={items} />
      <button>
        <UserOutlined />
      </button>
    </header>
  )
}