
import { Button } from 'antd'
import styles from '../styles/Home.module.scss'
import { HomeLayout } from '@/components/Layout/HomeLayout'
import { useAppDispatch } from '../store/hooks'
import { changeShowLogin } from '../store/common'
export default function Home() {
  const dispatch = useAppDispatch()
  return (
    <HomeLayout>
      <div className={styles.container}>
        <Button type="primary" onClick={() => dispatch(changeShowLogin())}>去登陆</Button>
        <div className={styles.txt}>blog</div>
      </div>
    </HomeLayout>
  )
}
