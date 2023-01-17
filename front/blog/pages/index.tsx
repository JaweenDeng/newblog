/*
 * @Descripttion: 首页
 * @version: 
 * @Author: JW
 * @Date: 2022-12-24 15:24:11
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Popover } from 'antd'
import { WechatOutlined, QqOutlined, RightCircleOutlined } from '@ant-design/icons'
import styles from './css/index.module.scss'
import { HomeLayout } from '@/components/Layout/HomeLayout'
import { Card } from '@/components/common/Card'
import { getHomeIndex } from './api/home'

export default function Home(props:any) {
  const [data, setData] = useState(props.data)
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.bannerWrap}>
          <div className={styles.banner}>
            <div className={styles.title}>
              <h1>我们无法做到完美， 但追求完美能让人卓越</h1>
              <h3>Perfection’snot attainable, but if we chase it we can catch excellence.</h3>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.instro}>
            <h3>个人简介</h3>
            <p>前端开发工程师，毕业于'广东工业大学'，专业'信息工程'。 1、本人性格开朗，乐观向上，有较好的团队协作能力。 2、工作态度端正、认真负责、做事细心并有耐心。适应能力强，抗压能力强。 3、平时关注“稀土掘金”、“简书”之类的相关资料对自己进行技术上提升。</p>
            <div className={styles.concact}>
              联系方式:
              <Popover content={"DJW1032782502"}><WechatOutlined style={{ fontSize: '25px', color: '#8AD041', marginLeft:'10px' }} /></Popover>
              <Popover content={"1032782502"}><QqOutlined style={{ fontSize: '25px', color: '#08c', marginLeft:'10px' }} /></Popover>
            </div>
          </div>
        </div>
        { data.note && data.note.length > 0 && <div className={styles.myNote}>
          <div className={styles.cardWrap}>
            <div className={styles.titleWrap}>
              <h3>我的笔记</h3>
              <Link href="/note">
                查看更多
                <RightCircleOutlined style={{'marginLeft':'10px'}}/>
              </Link>
            </div>
            <div className={styles.cards}>
              {
                data.note.map((item:any) =>{
                  return (
                    <Card key={item.id} data={item} />
                  )
                })
              }
            </div>
          </div>
        </div>}
        { data.hotReply && data.hotReply.length > 0 && <div className={styles.hotReply}>
          <div className={styles.cardWrap}>
            <div className={styles.titleWrap}>
              <h3>我的热评</h3>
              <Link href="/hotReply">
                查看更多
                <RightCircleOutlined style={{'marginLeft':'10px'}}/>
              </Link>
            </div>
            <div className={styles.cards}>
              {
                data.hotReply.map((item:any) =>{
                  return (
                    <Card key={item.id} data={item} />
                  )
                })
              }
            </div>
          </div>
        </div>}
        { data.joke && data.joke.length > 0 && <div className={styles.myJoke}>
          <div className={styles.cardWrap}>
            <div className={styles.titleWrap}>
              <h3>我的笑话</h3>
              <Link href="/joke">
                查看更多
                <RightCircleOutlined style={{'marginLeft':'10px'}}/>
              </Link>
            </div>
            <div className={styles.cards}>
              {
                data.joke.map((item:any) =>{
                  return (
                    <Card key={item.id} data={item} />
                  )
                })
              }
            </div>
          </div>
        </div>
        }
        { data.life && data.life.length > 0 &&  <div className={styles.myLife}>
          <div className={styles.cardWrap}>
            <div className={styles.titleWrap}>
              <h3>我的生活</h3>
              <Link href="/life">
                查看更多
                <RightCircleOutlined style={{'marginLeft':'10px'}}/>
              </Link>
            </div>
            <div className={styles.cards}>
              {
                data.life.map((item:any) =>{
                  return (
                    <Card key={item.id} data={item} />
                  )
                })
              }
            </div>
          </div>
        </div>
        }
      </div>
    </HomeLayout>
  )
}
export async function getServerSideProps(){
  const res = await getHomeIndex()
  return {
    props: {
      data:res.data
    },
  }
}
