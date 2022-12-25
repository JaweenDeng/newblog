/*
 * @Descripttion: 热评页面
 * @version: 
 * @Author: JW
 * @Date: 2022-12-24 15:24:11
 */
import { HomeLayout } from '@/components/Layout/HomeLayout'
import { Col, Row, Pagination  } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import styles from './css/hotReply.module.scss'
import logoImg from '@/public/assets/logo.jpg'
export default function hotReply() {
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
                  [1, 2, 3, 4, 5].map((item) =>{
                    return (
                      <Link href="/" className={styles.listItem}>
                        <h5>It's always darkest just before the dawn. 至暗总在黎明前。It's always darkest just before the dawn. 至暗总在黎明前。It's always darkest just before the dawn. 至暗总在黎明前。It's always darkest just before the dawn. 至暗总在黎明前。It's always darkest just before the dawn. 至暗总在黎明前。</h5>
                        <p>-程佳佳《山楂树之恋》</p>
                      </Link>
                    )
                  })
                }
              </div>
              <Pagination
                style={{'textAlign':'center'}}
                total={50}
                disabled
                showSizeChanger
                showQuickJumper
              />
            </Col>
            <Col span={7} offset={1}>
              <h4 className={styles.smallTitle}>热门推荐</h4>
              <Image src={logoImg} alt="" width={353} height={180} />
              <Image src={logoImg} alt="" width={353} height={180} />
              <Image src={logoImg} alt="" width={353} height={180} />
            </Col>
          </Row>
        </div>
      </div>
    </HomeLayout>
  )
}