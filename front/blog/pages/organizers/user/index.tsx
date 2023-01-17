/*
 * @Author: djw
 * @Description: 用户管理
 */
import { useEffect, useState } from 'react'
import { Table, Image, Button, message, Modal, Upload, Switch } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { OrganLayout } from '@/components/Layout/OrganLayout' 
import { getUserList, deleteUser, updateUser } from '../../api/organizers'
import { articleType, postUrl } from '@/config/config'
import { changeTime } from '@/utils/utils'
interface DataType {
  key: string;
  name: string;
  dataIndex:string;
}

export default function user () {
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const columns: ColumnsType<DataType> = [
    {
      title: 'userId',
      dataIndex: 'userId',
      key: 'userId',
      align:'center'
    },
    {
      title: '用户名',
      dataIndex: 'surname',
      key: 'surname',
      align:'center'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      align:'center'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align:'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align:'center',
      render: (_, record:any) => <Switch checked={record.status>0} onChange={(checked) => handleStatus({status:checked ? 1 : 0, userId:+record.userId})}></Switch>
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
      align:'center',
      render: (_, record:any) => <><span onClick={() => handleDelete(record.userId)}>删除</span></>
    },
  ]
  const [data, setData] = useState([])
  const getListHandle = async () => {
    const res:any = await getUserList({page:current})
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
      title: '您确定要删除该用户吗?',
      onOk:async () => {
        const res = await deleteUser({userId:id})
        if (res && res.code === 0) {
          message.success('删除成功!')
          getListHandle()
        }
      }
    })
  }
  // 上下架
  const handleStatus = async(params:any) => {
    const res = await updateUser(params)
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
      <Table columns={columns} dataSource={data} rowKey={'userId'} pagination={{total, showTotal:(total) => `共${total}条`}} onChange={ handleChange } />
      </>
    </OrganLayout>
  )
}