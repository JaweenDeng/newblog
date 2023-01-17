/*
 * @Author: djw
 * @Description: 留言板
 */
import { useEffect, useState } from 'react'
import { HomeLayout } from '@/components/Layout/HomeLayout'
import styles from './css/comment.module.scss'
import { Col, Row, Card, Button, Modal, Input, message, Empty } from 'antd'
import { useAppSelector } from '@/store/hooks'
import { getFirstReply, setFirstReply, setSecordReply, getSecordReply } from '@/pages/api/home'
import { changeTime } from '@/utils/utils'
const { TextArea } = Input
export default function comment() {
  const userInfo = useAppSelector(state => state.common.userInfo)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [curItem, setCurItem] = useState<any>({})
  const [comment, setComment] = useState<any>([])
  const handleOk = async () => {
    if (!userInfo.surname) {
      message.info('请先登录')
      return 
    }
    if (!inputValue) {
      message.info('请输入评论内容')
      return 
    }
    let res:any = {}
    if(curItem.id && curItem.userName) {
      res =  await setSecordReply({content:inputValue, parentId:curItem.id, replyUserName:curItem.userName})
    } else {
      res =  await setFirstReply({content:inputValue})
    }
    
    if (res.code === 0) {
      message.success('发表成功!')
      getComment()
      setInputValue('')
      setIsModalOpen(false)
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
  const getComment = async () => {
    const res = await getFirstReply()
    if (res && res.data) {
      setComment(res.data)
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
      const res = await getSecordReply({parentId:row.id})
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
    getComment()
  }, [])
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.bannerWrap}>
          <div className={styles.banner}>
            <div className={styles.title}>
              <h1>你掌心华丽的情色线条纠结进了谁的城池里欢声笑语。</h1>
              <h3>在我们一生之中，要牢记和要忘记的东西一样的多。在细胞里，在身体里面，与肉体永不分离，要摧毁它，就等于玉石俱焚。然，有些事情你必须忘记，忘记痛苦，忘记最爱的人对你的伤害。</h3>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Row>
            <Col span={16} className={styles.listWrap}>
              <h4 className={styles.smallTitle}>所有留言</h4>
              {
                  comment.length > 0 ? comment.map((item:any, index:number) => {
                    return <div className={styles.commentList} key={item.id}>
                      <h6>{item.userName}:</h6>
                      <p>{item.content}</p>
                      <div className={styles.wrap}>
                        <div>{changeTime(item.createTime)}</div>
                        <div className={styles.reply} onClick={() => handleOpen(item)}>回复</div>
                      </div>

                      { item.replies > 0 && <div className={styles.lookeMore} onClick={() => showMore(item, index)}>点击查看更多评论({item.replies})</div>}
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
            </Col>
            <Col span={7} offset={1}>
              <Card title="版主有话说">
                <p>
                  留下你对博主想说的，或者对网站的吐槽，或者有关技术问题，或者交换友链~~
                </p>
                <p>
                  记得文明交流，禁止发广告~~~
                </p>
                <Button type="primary" onClick={handleOpen}>发表留言</Button>
              </Card>
            </Col>
          </Row>
        </div>
        <Modal title="发表评论" open={isModalOpen} footer={null} onOk={handleOk} onCancel={() => {setIsModalOpen(false)}}>
          { isModalOpen && <TextArea rows={4} value={inputValue} className={styles.mt20} placeholder={'发布您的留言'} onChange={(e) => {setInputValue(e.target.value)}} /> }
          <div className={`${styles.textRight} ${styles.mt20}`}>
            <Button type="primary" onClick={handleOk} >
              发布
            </Button>
          </div>
        </Modal>
      </div>
    </HomeLayout>
  )
}