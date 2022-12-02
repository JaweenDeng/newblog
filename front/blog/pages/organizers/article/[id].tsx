/*
 * @Author: djw
 * @Description: 编辑文章
 */
import { Form, Input, Select, Upload, Button, message } from 'antd'
import { OrganLayout } from '@/components/Layout/OrganLayout' 
import { articleType } from '@/config/config'
import dynamic from 'next/dynamic'
import { upload } from '../../api/user'
// import { staticUrl } from '../../../config/config'
const ReactWEditor = dynamic(import("@/components/common/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>, //异步加载组件前的loading状态
});
export default function articleId() {
  const [form] = Form.useForm()
  // 图片封面上传
  const customRequest = async (e:any) => {
    const params = new FormData()
    params.append('file', e.file)
    const res = await upload(params)
    if (res.code == 0) {
      message.success('上传成功!')
      form.setFieldsValue({
        poster: res.data,
      });
    }
  }
  // 表单提交
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <OrganLayout>
      {/* <h1>新建文章</h1> */}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
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
          <Upload name="logo" customRequest={(e) => customRequest(e)} fileList={[]}>
            <Button>点击上传图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="文章详情"
          name="content"
        >
          <ReactWEditor />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </OrganLayout>
  )
}
