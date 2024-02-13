import {
  // CalendarOutlined,
  // BarChartOutlined,
  UnorderedListOutlined,
  ControlOutlined,
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
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import OutletLayout from './components/layout/Layout';
import RequireAuth from './components/RequireAuth';
import LoginPage from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import SettingsPage from './components/SettingsPage';

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
      <Routes>
        <Route path='/' element={<OutletLayout/>}>
            <Route path='admin' element={<RequireAuth>
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
                            label: <NavLink to=''>Список событий</NavLink>,
                          },
                          // {
                          //   key: '2',
                          //   icon: <CalendarOutlined />,
                          //   label: <NavLink to='calendar'>Календарь</NavLink>,
                          // },
                          // {
                          //   key: '3',
                          //   icon: <BarChartOutlined />,
                          //   label: <NavLink to='analitics'>Аналитика</NavLink>,
                          // },
                          {
                            key: '2',
                            icon: <ControlOutlined />,
                            label: <NavLink to='settings'>Настройки</NavLink>,
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
                        <Outlet/>
                      </Flex>
                    </Layout>
              </RequireAuth>}>
                <Route index element={<CardList/>}/>
                <Route path='calendar' element/>
                <Route path='analitics' element/>
                <Route path='settings' element={<SettingsPage/>}/>
              </Route>
            <Route index element={<LoginPage/>}/>
            <Route path='*' element={<ErrorPage/>}/>
        </Route>
      </Routes>
    </Layout>

  )

}
