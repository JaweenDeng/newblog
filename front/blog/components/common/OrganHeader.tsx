/*
 * @Author: djw
 * @Description: 后台头部
 */
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import styles from './css/OrganHeader.module.scss';
import { useRouter } from 'next/router'
export const OrganHeader:React.FC = () => {
  const router = useRouter()
  const [current, setCurrent] = useState('文章管理')
  useEffect(() => {
    if (router.pathname === '/organizers/comment') {
      setCurrent('评论管理')
    }
  })
  return (
    <div className={styles.OrganHeader}>
      <div>
        {current}
      </div>
      <div>
        <Link href="/">首页</Link>
      </div>
    </div>
  )
}
