import { useSelector, useDispatch } from 'react-redux';
import { switchSider } from '../../store/pageSlice';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

import { 
    Layout, 
    Button, 
    Typography 
} from 'antd';

const { Text } = Typography;
const { Header } = Layout;

export default function HeaderLayout() {

    
    const collapsed = useSelector(state => state.page.siderCollapse)
    const colorBgContainer = useSelector(state => state.page.colorBg)
    const dispatch = useDispatch()

    return (

        <Header 
            style={{ 
                padding: '0 1rem 0 0 ', 
                background: colorBgContainer, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => dispatch(switchSider())}
                style={{
                    fontSize: '1rem',
                    width: '4rem',
                    height: '4rem',
                }}/>
            <Text 
                level={4} 
                style={{
                    color: '#1677ff',
                    fontSize: '1.5rem'
                }}>
                Admin v1.0
            </Text>
        </Header>

    )

}