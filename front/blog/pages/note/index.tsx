/*
 * @Author: djw
 * @Description: 笔记列表页
 */
import { HomeLayout } from '@/components/Layout/HomeLayout'
import { Col, Row, Pagination } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../css/hotReply.module.scss'
import logoImg from '@/public/assets/logo.jpg'
import { getArticleList } from '@/pages/api/home'
import { useState } from 'react'
import { Card } from '@/components/common/Card'
export default function note(props:any) {
  const [data, setData] = useState(props.data.entry)
  const [total, setTotal] = useState(props.data.total)
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.bannerWrap}>
          <div className={styles.banner}>
            <div className={styles.title}>
              <h1>我的故事只想讲给你听</h1>
              <h3>当一首歌跟你的某段经历某场感情纠缠在一起的时候，你就再也没法自主地控制情绪。只要这个旋律响起，你都可能会掉眼泪。咖啡馆听到会哭出来，商场里逛街会哭出来，甚至在家里洗澡放歌都可能会掉眼泪。不是忘不掉什么人，只是始终对自己那场无果的付出和被浪费的太炽热的爱耿耿于怀。</h3>
            </div>
          </div>
        </div>
        <div className={styles.noteContent}>
          <div className={styles.list}>
            {
              data.map((item:any, index:number) =>{
                return (
                  <Card key={item.id} data={item} />
                )
              })
            }
          </div>
          <Pagination
            style={{'textAlign':'center', 'marginTop':'20px'}}
            total={total}
            showSizeChanger={false}
            itemRender={
              (page, type) => type === 'page' && <Link href={`/note?page=${page}`}>{page}</Link> 
                              
            }
          />
        </div>
      </div>
    </HomeLayout>
  )
}

export async function getServerSideProps(context:any){
  const page = context.query && context.query.page ? context.query.page : 1
  const res = await getArticleList({page, type:2, pageSize:16})
  return {
    props: {
      data:res.data
    },
  }
}
