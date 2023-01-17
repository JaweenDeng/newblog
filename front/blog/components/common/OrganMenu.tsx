/*
 * @Author: djw
 * @Description: 管理后台侧边栏
 */
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { FileAddOutlined, CommentOutlined, HighlightOutlined, UserOutlined } from '@ant-design/icons'
import { Logo } from '@/components/common/Logo';
import styles from './css/OrganMenu.module.scss';
import Router, { useRouter } from 'next/router'
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const OrganMenu = () => {
  const router = useRouter()
  const [current, setCurrent] = useState(router.pathname)
  const items: MenuProps['items'] = [
    getItem('文章管理', '/organizers/article', <FileAddOutlined />),
    getItem('评论管理', '/organizers/comment', <CommentOutlined />),
    getItem('留言管理', '/organizers/reply', <HighlightOutlined />),
    getItem('用户管理', '/organizers/user', <UserOutlined />)
  ]
  const onClick: MenuProps['onClick'] = e => {
    Router.push({
      pathname:e.key
    })
  };
  return (
    <div className={styles.OrganMenu}>
      <Logo />
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={[current]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  )
}