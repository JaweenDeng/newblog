/*
 * @Author: djw
 * @Description: Logo组件
 */
import Image from 'next/image'
import Link from 'next/link';
import logoImg from '@/public/assets/logo.jpg';
import styles from './css/Logo.module.scss';
export const Logo = () => {
  return (
    <Link href="/" className={styles.logoWrap}>
      <Image src={logoImg}  alt="logo" className={styles.logo} />
      <div className={styles.title}>BLOG</div>
    </Link>
  )
}