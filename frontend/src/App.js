import {
  CalendarOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import { 
  Flex,
  Layout, 
  Menu,
  theme, 
} from 'antd';

import CardList from './components/CardList';
import HeaderLayout from './components/layout/HeaderLayout';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setParams } from './store/pageSlice';

const { 
  Sider, 
} = Layout;


export default function App() {
  
  const collapsed = useSelector(state => state.page.siderCollapse) 
  const dispatch = useDispatch()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    dispatch(setParams({ colorBg: colorBgContainer, borderRadius: borderRadiusLG }))
  }, [dispatch, colorBgContainer, borderRadiusLG])

  return (

    <Layout
            style={{
              height: '100vh',
            }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UnorderedListOutlined />,
              label: 'Список событий',
            },
            {
              key: '2',
              icon: <CalendarOutlined />,
              label: 'Календарь',
            },
            {
              key: '3',
              icon: <BarChartOutlined />,
              label: 'Аналитика',
            },
          ]}
        />
      </Sider>
      <Layout style={{overflowY: 'scroll'}}>
        <HeaderLayout/>
        <Flex
          vertical
          style={{
            margin: '1.5rem 1rem',
            padding: '1.5rem',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          <CardList/>
        </Flex>
      </Layout>
    </Layout>

  )

}
