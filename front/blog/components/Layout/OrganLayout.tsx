/*
 * @Author: djw
 * @Description: 后台layout
 */
import React from 'react';
import { OrganHeader } from '@/components/common/OrganHeader';
import { OrganMenu } from '@/components/common/OrganMenu';
import styles from './css/organ.module.scss'
interface Iprops {
  children?:JSX.Element
}
export const OrganLayout:React.FC<Iprops> = (props) => {
  return (
    <div className={styles.layout}>
      <OrganMenu />
      <div className={styles.main}>
        <OrganHeader />
        <div className={styles.content}>
          { props.children }
        </div>
      </div>
    </div>
  )
}
