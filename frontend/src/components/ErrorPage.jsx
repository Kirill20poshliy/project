import React from 'react'
import { Layout, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Text } = Typography

export default function ErrorPage() {
  return (
    <Layout style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Text style={{
            fontSize: '1.5rem',
            fontWeight: '600'
        }}>
        404 Bad Gateway
        </Text>
        <Link to='/'>Назад</Link> 
    </Layout>
  )
}