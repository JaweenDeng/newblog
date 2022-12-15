
import Image from 'next/image'
import { Button } from 'antd'
import styles from './css/index.module.scss'
import { HomeLayout } from '@/components/Layout/HomeLayout'
import { useAppDispatch } from '../store/hooks'
import { changeShowLogin } from '../store/common'
export default function Home() {
  const dispatch = useAppDispatch()
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
          <Button type="primary" onClick={() => dispatch(changeShowLogin())}>去登陆</Button>
          <div className={styles.txt}>blog</div>
        </div>
      </div>
    </HomeLayout>
  )
}
