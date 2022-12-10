/*
 * @Author: djw
 * @Description: 文章管理
 */
import { useEffect, useState } from 'react'
import { Table, Image, Button, message, Modal, Upload } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { OrganLayout } from '@/components/Layout/OrganLayout' 
import { getArticle, deleteArticle, importArticle } from '../../api/organizers'
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
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      align:'center'
    },
    {
      title: '文章摘要',
      dataIndex: 'description',
      key: 'description',
      align:'center'
    },
    {
      title: '分类',
      dataIndex: 'type',
      key: 'type',
      align:'center',
      render: (text) => <span>{articleType[text]}</span>,
    },
    {
      title: '文章封面',
      dataIndex: 'poster',
      key: 'poster',
      align:'center',
      render: (text) => text ? <Image src={`${postUrl}${text}`} width={50}/> : '-',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
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
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align:'center',
      render: (text) => <span>{changeTime(text)}</span>
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
      align:'center',
      render: (_, record:any) => <><Link href={`/organizers/article/${record.id}`}>编辑</Link> <span onClick={() => handleDelete(record.id)}>删除</span></>
    },
  ]
  const [data, setData] = useState([])
  // 导入
  const customRequest = async (e:any) => {
    const params = new FormData()
    params.append('file', e.file)
    const res = await importArticle(params)
    if (res.code == 0) {
      message.success('导入成功!')
      setCurrent(1)
      getListHandle()
    }
  }
  const getListHandle = async () => {
    const res:any = await getArticle({page:current})
    if (res && res.code === 0) {
      setTotal(res.data.total)
      setData(res.data.entry as [])
    }
  }
  // 分页
  const handleChange = (pagination:any) => {
    setCurrent(pagination.current)
    getListHandle()
  }
  // 删除
  const handleDelete = (id:number) => {
    Modal.info({
      title: '您确定要删除该文章吗?',
      onOk:async () => {
        const res = await deleteArticle(id)
        if (res && res.code === 0) {
          message.success('删除成功!')
          getListHandle()
        }
      }
    })
  }
  useEffect(() => {
    getListHandle()
  }, [])
  return (
    <OrganLayout>
      <>
      <Button type="primary">
        <Link href={`/organizers/article/0`}>新建文章</Link>
      </Button>
      <Upload name="logo" fileList={[]} customRequest={(e) => customRequest(e)}>
        <Button>导入</Button>
      </Upload>
      <Table columns={columns} dataSource={data} rowKey={'id'} pagination={{total}} onChange={ handleChange } />
      </>
    </OrganLayout>
  )
}