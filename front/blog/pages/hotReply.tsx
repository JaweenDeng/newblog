/*
 * @Descripttion: 热评页面
 * @version: 
 * @Author: JW
 * @Date: 2022-12-24 15:24:11
 */
import { HomeLayout } from '@/components/Layout/HomeLayout'
import { Col, Row, Pagination } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import styles from './css/hotReply.module.scss'
import logoImg from '@/public/assets/logo.jpg'
import { getHotPely } from '@/pages/api/home'
import { useState } from 'react'

export default function hotReply(props:any) {
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
        <div className={styles.content}>
          <Row>
            <Col span={16} className={styles.listWrap}>
              <h4 className={styles.smallTitle}>全部热评</h4>
              <div className={styles.list}>
                {
                  data.map((item:any, index:number) =>{
                    return (
                      <Link href="/" className={styles.listItem} key={index}>
                        <h5 dangerouslySetInnerHTML={{ __html: item.content }}></h5>
                        <p>- {item.title}</p>
                      </Link>
                    )
                  })
                }
              </div>
              <Pagination
                style={{'textAlign':'center'}}
                total={total}
                showSizeChanger={false}
                itemRender={
                  (page, type) => type === 'page' && <Link href={`/hotReply?page=${page}`}>{page}</Link> 
                                  
                }
              />
            </Col>
            <Col span={7} offset={1}>
              <h4 className={styles.smallTitle}>热门推荐</h4>
              <Link href="/" className={styles.topItem}>
                <Image src={logoImg} alt="" width={353} height={180} />
              </Link>
              <Link href="/" className={styles.topItem}>
                <Image src={logoImg} alt="" width={353} height={180} />
              </Link>
              <Link href="/" className={styles.topItem}>
                <Image src={logoImg} alt="" width={353} height={180} />
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </HomeLayout>
  )
}

export async function getServerSideProps(context:any){
  const page = context.query && context.query.page ? context.query.page : 1
  const res = await getHotPely({page})
  return {
    props: {
      data:res.data
    },
  }
}