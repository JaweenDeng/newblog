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
import { changeTime } from '@/utils/utils'
import { postUrl } from '@/config/config'
export const Card = ({ data }:any) => {
  return (
    <Link href={`/articleDetail/${data.id}`} className={styles.card}>
      { data && data.poster ? <Image src={`${postUrl}${data.poster}`} alt="" width={280} height={140} /> : <Image src={logoImg} alt="" width={280} height={140} /> }
      <div className={styles.cardContent}>
        <h4>{ data.title }</h4>
        <p>{ data.description }</p>
      </div>
      <div className={styles.cardFooter}>
        <div><ClockCircleOutlined style={{'color':'#87E8DE', 'marginRight':'5px'}} />{changeTime(data.createTime, 1)}</div>
        <div className={styles.borderItem}><MessageOutlined style={{'color':'#FFD666', 'marginRight':'5px'}} />{data.read}</div>
        {/* <div><EyeOutlined style={{'color':'skyblue', 'marginRight':'5px'}} />0</div> */}
      </div>
    </Link>
  )
}