/*
 * @Author: djw
 * @Description: 后台头部
 */
import React from 'react';
import { Col, Row } from 'antd';
import Link from "next/link";

export const OrganHeader:React.FC = () => {
  return (
    <Row>
      <Col span={6}>
        文章管理
      </Col>
      <Col span={8}>
        <Link href="/">首页</Link>
        
      </Col>
    </Row>
  )
}
