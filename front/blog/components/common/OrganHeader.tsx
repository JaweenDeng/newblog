/*
 * @Author: djw
 * @Description: 后台头部
 */
import React from 'react';
import Link from "next/link";
import styles from './css/OrganHeader.module.scss';
export const OrganHeader:React.FC = () => {
  return (
    <div className={styles.OrganHeader}>
      <div>
        文章管理
      </div>
      <div>
        <Link href="/">首页</Link>
        
      </div>
    </div>
  )
}
