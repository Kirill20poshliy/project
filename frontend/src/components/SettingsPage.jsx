import { 
    Space, 
    Typography, 
    Button, 
    Flex, 
    Divider, 
    Collapse, 
    Popconfirm, 
    Spin, 
    message, 
    Modal, 
    Form, 
    Input 
} from 'antd';
import { useNavigate } from 'react-router-dom'
import { 
    useCreateGroupMutation, 
    useCreateSpeakerMutation, 
    useCreateTypeMutation, 
    useDeleteGroupMutation, 
    useDeleteSpeakerMutation, 
    useDeleteTypeMutation, 
    useGetGroupsQuery, 
    useGetSpeakersQuery, 
    useGetTypesQuery, 
    useLogoutMutation, 
    useUpdateGroupMutation, 
    useUpdateSpeakerMutation, 
    useUpdateTypeMutation 
} from '../store/api';

import ObjectCard from './ObjectCard';
import { useState } from 'react'

import {
    PlusOutlined,
} from '@ant-design/icons';

const { Text } = Typography


export default function SettingsPage() {

    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [title, setTitle] = useState('')

    const [setLogout] = useLogoutMutation()
    const [deleteGroup, dgData] = useDeleteGroupMutation()
    const [deleteType, dtData] = useDeleteTypeMutation()
    const [deleteSpeaker, dsData] = useDeleteSpeakerMutation()
    const [updateGroup, ugData] = useUpdateGroupMutation()
    const [updateType, utData] = useUpdateTypeMutation()
    const [updateSpeaker, usData] = useUpdateSpeakerMutation()
    const [createGroup, cgData] = useCreateGroupMutation()
    const [createType, ctData] = useCreateTypeMutation()
    const [createSpeaker, csData] = useCreateSpeakerMutation()

    const groups = useGetGroupsQuery()
    const speakers = useGetSpeakersQuery()
    const types = useGetTypesQuery()

    const createHandler = async (action) => {
        try {
            await action(title)
            setTitle('')
            message.success('Объект создан!')
        } catch (e) {
            console.log(e)
            message.error(e?.message)
        }
    }

    const cancelHandler = () => {
        setModal1(false)
        setModal2(false)
        setModal3(false)
    }

    const navigate = useNavigate()

    const logout = async () => {
        await setLogout().then(data => {
            if (data) {
                navigate('/')
            }
        })
    }

    return (

        <>
            <Flex justify='space-between' align='center' style={{ width: '100%' }}>
                <Text>
                    <Text style={{fontWeight: 600}}>Настройки</Text> 

                </Text>
                <Popconfirm 
                        title='Выйти?'
                        onConfirm={logout}
                        okText="Да"
                        cancelText="Нет">
                    <Button 
                        type='primary'
                        danger>
                        Выйти
                    </Button>
                </Popconfirm>
            </Flex>
            <Divider/>
            <Space
                direction="vertical"
                style={{
                    display: 'flex',
                }}
            >
            <Collapse
                items={[
                    {
                        key: 1,
                        label: 'Groups',
                        children: <> 
                            <Button type='primary' style={{marginBottom: '.5rem'}} onClick={() => setModal1(true)}>
                                <PlusOutlined/> Добавить
                            </Button>
                            {groups.isSuccess 
                            ? groups.data.data.map((group, idx) => <ObjectCard 
                                                                    delete={deleteGroup}
                                                                    update={updateGroup}
                                                                    key={idx} 
                                                                    id={group.id} 
                                                                    title={group.code}/>) 
                            : 'Загрузка'}
                            <Modal
                                title='Создать объект' 
                                open={modal1} 
                                onCancel={cancelHandler}
                                onOk={() => createHandler(createGroup)}>
                                <Form>
                                    <Form.Item id={'create'}>
                                        <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </>
                    },
                    {
                        key: 2,
                        label: 'Types',
                        children: <>
                            <Button type='primary' style={{marginBottom: '.5rem'}} onClick={() => setModal2(true)}>
                                <PlusOutlined/> Добавить
                            </Button>
                            {types.isSuccess 
                            ? types.data.data.map((type, idx) => <ObjectCard 
                                                                    delete={deleteType}
                                                                    update={updateType}
                                                                    key={idx} 
                                                                    id={type.id} 
                                                                    title={type.name}/>) 
                            : 'Загрузка'}
                            <Modal
                                title='Создать объект' 
                                open={modal2} 
                                onCancel={cancelHandler}
                                onOk={() => createHandler(createType)}>
                                <Form>
                                    <Form.Item id={'create'}>
                                        <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </> 
                    },
                    {
                        key: 3,
                        label: 'Speakers',
                        children: <>
                            <Button type='primary' style={{marginBottom: '.5rem'}} onClick={() => setModal3(true)}>
                                <PlusOutlined/> Добавить
                            </Button>
                            {speakers.isSuccess 
                            ? speakers.data.data.map((speaker, idx) => <ObjectCard 
                                                                    delete={deleteSpeaker}
                                                                    update={updateSpeaker}
                                                                    key={idx} 
                                                                    id={speaker.id} 
                                                                    title={speaker.name}/>) 
                            : 'Загрузка'}
                            <Modal
                                title='Создать объект' 
                                open={modal3} 
                                onCancel={cancelHandler}
                                onOk={() => createHandler(createSpeaker)}>
                                <Form>
                                    <Form.Item id={'create'}>
                                        <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </> 
                    },
                    {
                        key: 4,
                        label: 'Admins',
                        children: <p>Admins</p>
                    },
                ]}
            />
            </Space>
            <Spin 
                fullscreen 
                spinning={
                    dgData.isLoading 
                    || dtData.isLoading
                    || dsData.isLoading
                    || ugData.isLoading
                    || utData.isLoading
                    || usData.isLoading
                    || cgData.isLoading
                    || ctData.isLoading
                    || csData.isLoading
                }/>
        </>

    )

}