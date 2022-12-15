/*
 * @Author: djw
 * @Description: 用户名模块
 */
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { changeShowLogin, Logout } from '@/store/common'

export const UserInfo = () => {
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(state => state.common.userInfo)
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={() => dispatch(Logout())}>
          退出
        </span>
      ),
    }
  ]
  return (
    <>
      {
        userInfo?.surname ? 
        <Dropdown menu={{ items }}>
          <div>
            {`欢迎，${userInfo?.surname}` }
          </div>
        </Dropdown>
        : <div onClick={() => dispatch(changeShowLogin())}>
          登录
        </div>
      }
    </>
  )
}
