/*
 * @Author: djw
 * @Description: 编辑文章
 */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Form, Input, Select, Upload, Button, message, InputNumber, Switch  } from 'antd'
import Link from 'next/link'
import type { UploadFile } from 'antd/es/upload/interface';
import { OrganLayout } from '@/components/Layout/OrganLayout' 
import { articleType } from '@/config/config'
import { upload } from '../../api/user'
import { saveArticle, editArticle, getArticleDetail } from '../../api/organizers'
import { postUrl } from '../../../config/config'

const ReactWEditor = dynamic(import("@/components/common/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>, //异步加载组件前的loading状态
})

export default function articleId() {
  const router = useRouter()
  const id = router.query.id
  const [form] = Form.useForm()
  const [html, setHtml] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  useEffect(() =>{
    getDetail()
  },[id])

  // 获取文章详情
  const getDetail = async () => {
    if(id && id != '0') {
      const res:any = await getArticleDetail((id as string))
      if (res && res.code === 0) {
        console.log(res.data)
        form.setFieldsValue({
          ...(res.data as Object),
          status:res.data.status === 1
        })
        if (res.data.poster) {
          setFileList([
            {
              uid: '-1',
              name: '封面图',
              status: 'done',
              url: `${postUrl}${res.data.poster}`,
            },
          ])
        }
        if (res.data.content) {
          setHtml(res.data.content)
        }
      }
    }
  }

  // 图片封面上传
  const customRequest = async (e:any) => {
    const params = new FormData()
    params.append('file', e.file)
    const res = await upload(params)
    if (res.code == 0) {
      message.success('上传成功!')
      form.setFieldsValue({
        poster: res.data,
      })
      setFileList([
        {
          uid: '-1',
          name: e.file.name,
          status: 'done',
          url: `${postUrl}${res.data}`,
        },
      ])
    }
  }
  // 移除上传封面
  const handleRemove = () => {
    setFileList([])
    form.setFieldsValue({
      poster: '',
    })
  }
  // 表单提交
  const onFinish = async (values: any) => {
    const params = {
      ...values, 
      content:html, 
      status:values.status ? 1 : 0
    }
    const res = id && id != '0' ? await editArticle((id as string), params) : await saveArticle(params)
    if (res.code === 0) {
      message.success('发布成功!')
      router.push('/organizers/article')
    }
  };
  return (
    <OrganLayout>
      {/* <h1>新建文章</h1> */}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="文章摘要"
          name="description"
          rules={[{ required: true, message: '请输入文章摘要' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="分类"
          name="type"
          rules={[{ required: true, message: '请选择所属分类' }]}
        >
          <Select>
            {
              Object.keys(articleType).map(key => (
                <Select.Option value={+key} key={+key}>{articleType[key]}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="文章封面"
          name="poster"
          rules={[{ required: false, message: '请上传文章封面' }]}
        >
          <Upload name="logo" fileList={fileList} customRequest={(e) => customRequest(e)} onRemove={() => handleRemove()}>
            <Button>点击上传图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="排序"
          name="sort"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="上下架"
          name="status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="文章详情"
          name="content"
        >
          <ReactWEditor html={html} setHtml={setHtml} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button>
            <Link href="/organizers/article">返回</Link>
          </Button>
        </Form.Item>
      </Form>
    </OrganLayout>
  )
}
