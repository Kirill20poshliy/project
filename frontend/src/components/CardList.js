import { useState } from 'react'
import { Space, Typography, Button, Flex, Divider } from 'antd';
import EventCard from './EventCard';

import {
    PlusOutlined,
} from '@ant-design/icons';

import { useGetEventsQuery } from '../store/api';
import ModalWin from './ModalWin';

const { Text } = Typography

export default function CardList() {

    const {data, isLoading, isSuccess} = useGetEventsQuery()

    const [modal, setModal] = useState(false)

    return (
        <>
            <Flex justify='space-between' align='center' style={{ width: '100%' }}>
                <Text>
                    <Text style={{fontWeight: 600}}>Всего: </Text> 
                    {isSuccess && data.count}
                </Text>
                <Button 
                    type='primary'
                    onClick={() => setModal(true)}
                    >
                    <PlusOutlined/>
                </Button>
            </Flex>
            <Divider/>
            <Space
                direction="vertical"
                style={{
                    display: 'flex',
                }}
            >
                { !isLoading 
                        ? data.data.map(event => (
                        <EventCard 
                            key={event.id}
                            idx={event.id} 
                            title={event.title}
                            datetime={event.datetime}    
                            duration={event.duration}
                            link={event.link}
                            canceled={event.canceled}
                            groupId={event.GroupId}
                            typeId={event.TypeId}
                            speakerId={event.SpeakerId}/>
                        ))
                        : 'Загрузка...'
                } 
                <ModalWin 
                    modal={modal}
                    modalTitle='Добавить событие' 
                    cancel={() => setModal(modal ? false : true)}   
                    />
            </Space>
        </>

    )

}