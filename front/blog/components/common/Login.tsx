/*
 * @Author: djw
 * @Description: 登录注册组件
 */
import { Modal, Button, Form, Input, Col, Row, message } from 'antd'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { changeShowLogin } from '../../store/common'
import { toLogin, toRegister } from '../../pages/api/user'

type IType = 'login' | 'forgetPsd' | 'register'
interface Ifrom {
  phone:string,
  email?:string,
  password:string,
  surname?:string
}

enum title{
  login = '登录',
  forgetPsd = '忘记密码',
  register = '注册'
}
//表单结构
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
export const Login = () => {
  const isModalOpen = useAppSelector(state => state.common.showLogin) 
  const dispatch  = useAppDispatch()
  const [ formType, setFormType ] = useState<IType>('login')
  const changeType = (val:IType) => {
    setFormType(val)
    form.resetFields()
  }
  const [ form ] = Form.useForm()
  const handleCancel = () => {
    dispatch(changeShowLogin())
    form.resetFields()
    setFormType('login')
  }
  const onFinish = async (values:Ifrom) => {
    const handleSuccess = () => {
      form.resetFields()
      dispatch(changeShowLogin())
    }
    if (formType === 'login') {
      const res = await toLogin({...values})
      if (res.code === 0 && res.data) {
        message.success('登录成功!')
        localStorage.setItem('token', (res.data as string))
        handleSuccess()
      }
    } else if (formType === 'register') {
      const res = await toRegister({...values})
      if (res && res.code === 0) {
        message.success('注册成功!')
        handleSuccess()
      }
    }
    
  }
  return(
    <>
      <Modal title={title[formType]} open={isModalOpen} footer={null} onCancel={handleCancel}>
        <Form {...layout} form={form} name="login-form" onFinish={onFinish}>
          <Form.Item name="phone" label="手机号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {
            formType !== 'login' && 
            <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          }
          {
            formType === 'register' && 
            <Form.Item name="surname" label="昵称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          }
          <Form.Item name="password" label="密码" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Row justify="space-between" align="middle">
              { formType !== 'login' && <Col className="hand" onClick={() => changeType('login')}>去登录</Col> }
              { formType !== 'register' && <Col className="hand" onClick={() => changeType('register')}>去注册</Col> }
              { formType !== 'forgetPsd' && <Col className="hand" onClick={() => changeType('forgetPsd')}>忘记密码</Col> }
            </Row>
            <Row justify="center" align="middle">
              <Button type="primary" htmlType="submit" >
                确定
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}