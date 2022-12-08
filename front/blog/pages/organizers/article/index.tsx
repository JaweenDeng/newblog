/*
 * @Author: djw
 * @Description: 文章管理
 */
import { useEffect } from 'react'
import { OrganLayout } from '@/components/Layout/OrganLayout' 
import { getArticle } from '../../api/organizers'
export default function Article () {
  const getListHandle = async () => {
    const res = await getArticle()
    console.log(res)
  }
  useEffect(() => {
    getListHandle()
  })
  return (
    <OrganLayout>
      <div>
        list
      </div>
    </OrganLayout>
  )
}