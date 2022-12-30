/*
 * @Author: djw
 * @Description: 评论管理
 */
import { useEffect, useState } from 'react'
import { Table, Image, Button, message, Modal, Upload } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { OrganLayout } from '@/components/Layout/OrganLayout' 
import { getCommentList, deleteComment } from '../../api/organizers'
import { articleType, postUrl } from '@/config/config'
import { changeTime } from '@/utils/utils'
interface DataType {
  key: string;
  name: string;
  dataIndex:string;
}

export default function Article () {
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const columns: ColumnsType<DataType> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align:'center'
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
      align:'center'
    },
    {
      title: '评论文章ID',
      dataIndex: 'articleId',
      key: 'articleId',
      align:'center'
    },
    {
      title: '评论人',
      dataIndex: 'userName',
      key: 'userName',
      align:'center'
    },
    {
      title: '被评论人',
      dataIndex: 'replyUserName',
      key: 'replyUserName',
      align:'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align:'center',
      render: (text) => <span>{text>0 ? '上架' : '下架'}</span>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align:'center',
      render: (text) => <span>{changeTime(text)}</span>
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
      align:'center',
      render: (_, record:any) => <><span onClick={() => handleDelete(record.id)}>删除</span></>
    },
  ]
  const [data, setData] = useState([])
  const getListHandle = async () => {
    const res:any = await getCommentList({page:current})
    if (res && res.code === 0) {
      setTotal(res.data.total)
      setData(res.data.entry as [])
    }
  }
  // 分页
  const handleChange = (pagination:any) => {
    setCurrent(pagination.current)
  }
  // 删除
  const handleDelete = (id:number) => {
    Modal.info({
      title: '您确定要删除该评论吗?',
      onOk:async () => {
        const res = await deleteComment(id)
        if (res && res.code === 0) {
          message.success('删除成功!')
          getListHandle()
        }
      }
    })
  }
  useEffect(() => {
    getListHandle()
  }, [current])
  return (
    <OrganLayout>
      <>
      <Table columns={columns} dataSource={data} rowKey={'id'} pagination={{total, showTotal:(total) => `共${total}条`}} onChange={ handleChange } />
      </>
    </OrganLayout>
  )
}