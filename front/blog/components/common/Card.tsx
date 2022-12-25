/*
 * @Descripttion: 文章卡片
 * @version: 
 * @Author: JW
 * @Date: 2022-12-24 22:03:16
 */

import Link from "next/link"
import Image from 'next/image'
import { ClockCircleOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons'
import styles from './css/Card.module.scss'
import logoImg from '@/public/assets/logo.jpg'

export const Card = () => {
  return (
    <Link href="/" className={styles.card}>
      <Image src={logoImg} alt="" width={280} height={140} />
      <div className={styles.cardContent}>
        <h4>这是我的标题</h4>
        <p>这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介</p>
      </div>
      <div className={styles.cardFooter}>
        <div><ClockCircleOutlined style={{'color':'#87E8DE', 'marginRight':'5px'}} /> 20-08-10</div>
        <div className={styles.borderItem}><MessageOutlined style={{'color':'#FFD666', 'marginRight':'5px'}} />0</div>
        <div><EyeOutlined style={{'color':'skyblue', 'marginRight':'5px'}} />0</div>
      </div>
    </Link>
  )
}