/*
 * @Author: djw
 * @Description: 留言管理
 */
import { useEffect, useState } from 'react'
import { Table, Image, Button, message, Modal, Upload, Switch } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { OrganLayout } from '@/components/Layout/OrganLayout' 
import { getReplyList, deleteReply, updateReply } from '../../api/organizers'
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
      title: '留言内容',
      dataIndex: 'content',
      key: 'content',
      align:'center'
    },
    {
      title: '留言人',
      dataIndex: 'userName',
      key: 'userName',
      align:'center'
    },
    {
      title: '被回复人',
      dataIndex: 'replyUserName',
      key: 'replyUserName',
      align:'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align:'center',
      render: (_, record:any) => <Switch checked={record.status>0} onChange={(checked) => handleStatus({status:checked ? 1 : 0, id:+record.id, parentId:record.parentId})}></Switch>
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
      render: (_, record:any) => <><span onClick={() => handleDelete(record.id, record.parentId)}>删除</span></>
    },
  ]
  const [data, setData] = useState([])
  const getListHandle = async () => {
    const res:any = await getReplyList({page:current})
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
  const handleDelete = (id:number, parentId:number) => {
    Modal.info({
      title: '您确定要删除该留言吗?',
      onOk:async () => {
        const res = await deleteReply(id, {parentId})
        if (res && res.code === 0) {
          message.success('删除成功!')
          getListHandle()
        }
      }
    })
  }
  // 上下架
  const handleStatus = async(params:any) => {
    const res = await updateReply(params)
    if (res && res.code === 0) {
      message.success('修改成功!')
      getListHandle()
    }
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