/*
 * @Author: djw
 * @Description: 管理后台侧边栏
 */
import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { FileAddOutlined } from '@ant-design/icons'
import { Logo } from '@/components/common/Logo';
import styles from './css/OrganMenu.module.scss';
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
  const items: MenuProps['items'] = [
    getItem('文章管理', 'article', <FileAddOutlined />)
  ]
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
  };
  return (
    <div className={styles.OrganMenu}>
      <Logo />
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  )
}