/*
 * @Author: djw
 * @Description: 留言板
 */
import { useState } from 'react'
import { HomeLayout } from '@/components/Layout/HomeLayout'
import styles from './css/comment.module.scss'
import { Col, Row, Card, Button, Modal, Input, message } from 'antd'
import { useAppSelector } from '@/store/hooks'
const { TextArea } = Input
export default function comment() {
  const userInfo = useAppSelector(state => state.common.userInfo)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [curItem, setCurItem] = useState({})
  const handleOk = () => {

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
            </Col>
            <Col span={7} offset={1}>
              <Card title="版主有话说">
                <p>
                  留下你对博主想说的，或者对网站的吐槽，或者有关技术问题，或者交换友链~~
                </p>
                <p>
                  记得文明交流，禁止发广告~~~
                </p>
                <Button type="primary" onClick={() => handleOpen}>发表留言</Button>
              </Card>
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