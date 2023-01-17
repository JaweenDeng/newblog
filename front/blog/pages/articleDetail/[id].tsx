/*
 * @Author: djw
 * @Description: 文章详情页
 */
import { HomeLayout } from '@/components/Layout/HomeLayout'
import { Col, Row, Empty, Input, Button, message, Modal } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../css/hotReply.module.scss'
import logoImg from '@/public/assets/logo.jpg'
import { getHotPelyDetail, getFirstComment, setFirstCommnet, setSecordComment, getSecordComment } from '@/pages/api/home'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/store/hooks'
import { changeTime } from '@/utils/utils'
const { TextArea } = Input
export default function hotReply(props:any) {
  const router = useRouter()
  const userInfo = useAppSelector(state => state.common.userInfo)
  const [data, setData] = useState(props.data)
  const [comment, setComment] = useState<any>([])
  const [inputVal, setInputVal] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [curItem, setCurItem] = useState({})
  const getComment = async () => {
    
    const res:any = await getFirstComment({id:router.query.id})
    if (res && res.code === 0) {
      setComment(res.data)
    }
  }
  const handleSubmit = async () => {
    if (!userInfo.surname) {
      message.info('请先登录')
      return 
    }
    if (!inputVal) {
      message.info('请输入评论内容')
      return 
    }
    const res =  await setFirstCommnet({articleId:router.query.id, content:inputVal})
    if (res.code === 0) {
      message.success('发表成功!')
      getComment()
      setInputVal('')
    }
  }
  const handleOpen = (row:any) => {
    if (!userInfo.surname) {
      message.info('请先登录')
      return 
    }
    setInputValue('')
    setCurItem(row)
    setIsModalOpen(true)
  }
  const handleOk = async () => {
    if (!inputValue) {
      message.info('请输入评论内容')
      return 
    }
    const res =  await setSecordComment({articleId:router.query.id, content:inputValue, parentId:curItem.id, replyUserName:curItem.userName})
    if (res.code === 0) {
      message.success('发表成功!')
      getComment()
      setIsModalOpen(false)
    }
  }
  const showMore = async (row:any, index:number) => {
    let newComment = [
      ...comment
    ]
    if (comment[index] && comment[index]['more'] && comment[index]['more']['length']) {
      newComment[index] = {
        ...row,
        more:[]
      }
    } else {
      const res = await getSecordComment({articleId:router.query.id, parentId:row.id})
      if (res.code === 0) {
        newComment[index] = {
          ...row,
          more:res.data
        }
      }
    }
    setComment(newComment)
  }
  useEffect(() => {
    if (props.data && !props.data.status) {
      return message.error('该文章已下架!')
    } else {
      getComment()
    }
  }, [])
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
              <h4 className={styles.smallTitle}>文章详情</h4>
              <div className={styles.list}>
                <h2 dangerouslySetInnerHTML={{ __html: data.content }}></h2>
                <p className={styles.textRight}>- {data.title}</p>
              </div>
              <div className={styles.comment}>
                <h3>全部评论</h3>
                {
                  comment.length > 0 ? comment.map((item:any, index:number) => {
                    return <div className={styles.commentList} key={item.id}>
                      <h6>{item.userName}:</h6>
                      <p>{item.content}</p>
                      <div className={styles.wrap}>
                        <div>{changeTime(item.createTime)}</div>
                        <div className={styles.reply} onClick={() => handleOpen(item)}>回复</div>
                      </div>
                      { item.replies && item.replies > 0 && <div className={styles.lookeMore} onClick={() => showMore(item, index)}>点击查看更多评论({item.replies})</div>}
                      { item.more && item.more.length > 0 && <div className={styles.smallWrap}>
                          {
                            item.more.map((pItem:any) => {
                              return (
                                <div key={pItem.id} className={styles.smallItem}>
                                  <h6>{pItem.userName}:{pItem.replyUserName}</h6>
                                  <p>{pItem.content}</p>
                                  <div className={styles.wrap}>
                                    <div>{changeTime(pItem.createTime)}</div>
                                    <div className={styles.reply} onClick={() => handleOpen({id:item.id, userName:pItem.userName})}>回复</div>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>}
                    </div>
                  }) : <Empty description={'暂无评论'} />
                }
                <TextArea rows={4} value={inputVal} className={styles.mt20} placeholder={'发布您对该文章的看法'} onChange={(e) => {setInputVal(e.target.value)}} />
                <div className={`${styles.textRight} ${styles.mt20}`}>
                  <Button type="primary" onClick={handleSubmit}>
                    发布
                  </Button>
                </div>
              </div>
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
        <Modal title="发表评论" open={isModalOpen} footer={null} onOk={handleOk} onCancel={() => {setIsModalOpen(false)}}>
          { isModalOpen && <TextArea rows={4} value={inputValue} className={styles.mt20} placeholder={'发布您对该文章的看法'} onChange={(e) => {setInputValue(e.target.value)}} /> }
          <div className={`${styles.textRight} ${styles.mt20}`}>
            <Button type="primary" onClick={handleOk}>
              发布
            </Button>
          </div>
        </Modal>
      </div>
    </HomeLayout>
  )
}

export async function getServerSideProps(context:any){
  const id = context.params && context.params.id ? context.params.id : 1
  const res = await getHotPelyDetail({id})
  return {
    props: {
      data:res.data
    },
  }
}
