import { Card, Button, Typography, Flex, Skeleton, Spin, Popconfirm, message } from 'antd';

import {
    CloseOutlined,
    EditOutlined,
} from '@ant-design/icons';

import { 
    useDeleteEventMutation, 
    useLazyGetGroupQuery, 
    useLazyGetSpeakerQuery, 
    useLazyGetTypeQuery, 
} from '../store/api';

import { useEffect, useState } from 'react';
import ModalWin from './ModalWin';

const { Text } = Typography

export default function EventCard(props) {

    const {
        idx,
        title,
        datetime,
        duration,    
        link,
        canceled,
        groupId,
        typeId,
        speakerId,
    } = props

    const [getGroup, group] = useLazyGetGroupQuery()
    const [getType, type] = useLazyGetTypeQuery()
    const [getSpeaker, speaker] = useLazyGetSpeakerQuery()
    const [deleteEvent, event] = useDeleteEventMutation()

    const [modal, setModal] = useState(false)

    const date = new Date(datetime)

    const pasteMonth = (num) => {
        switch(num) {
            case 0:
                return 'января';
            case 1:
                return 'февраля';
            case 2:
                return 'марта';
            case 3:
                return 'апреля';
            case 4:
                return 'мая';
            case 5:
                return 'июня';
            case 6:
                return 'июля';
            case 7:
                return 'августа';
            case 8:
                return 'сентября';
            case 9:
                return 'октября';
            case 10:
                return 'ноября';
            case 11:
                return 'декабря';
            default:
                return 
        }
    }

    const confirm = () => {
        deleteEvent(idx).then(data => message.success(data.data.message))
    }

    const cancel = () => {
        message.error('Отмена')
    }

    const fields = {
        id: idx,
        subject: title,
        speaker: speakerId,
        type: typeId,
        group: groupId,
        date: datetime,
        time: datetime,
        duration: duration,
        link: link,
        canceled: canceled,
    }

    useEffect(() => {
        groupId && getGroup(groupId)
        typeId && getType(typeId)
        speakerId && getSpeaker(speakerId)
    }, [getGroup, groupId, getType, typeId, getSpeaker, speakerId])

    return (
        <Card
            style={canceled && {backgroundColor: '#ffccc7'}}
            type="inner"
            title={
                <Flex gap='.75rem'>
                    {canceled ? 'Отменено.' : ''}
                    <Text style={canceled && {textDecoration: 'line-through'}}>
                        {title}
                    </Text> 
                </Flex> 
            }
            extra={
                <Flex gap='.5rem'>
                    <Button onClick={() => setModal(true)}>    
                        <EditOutlined/>
                    </Button>
                    <Popconfirm
                        title='Удалить событие'
                        description="Вы действительно хотите удалить событие?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Да"
                        cancelText="Нет">
                        <Button 
                            danger>
                            <CloseOutlined />
                        </Button>
                    </Popconfirm>
                </Flex>
                }>
            <Flex justify='space-between'>
                <Flex gap='.5rem'>
                    <Flex vertical>
                        <Text>
                            Преподаватель: {
                                speaker.isSuccess 
                                ? speaker.data.data.name 
                                : <Skeleton.Input active size='small'/>}
                        </Text>
                        <Flex gap='.5rem'>
                            <Text style={{fontWeight: 600}}>
                                {
                                    type.isSuccess 
                                    ? type.data.data.name 
                                    : <Skeleton.Input active size='small'/>}.
                            </Text>
                            <Text>Группа: {group.isSuccess ? group.data.data.code : '#'}.</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex vertical align='center'>
                    {
                        canceled || !link
                        ? ''
                        : <a href={link}>Ссылка на подключение</a>
                    }
                    <Text>
                        {date.getDate() 
                            + ' ' 
                            + pasteMonth(date.getMonth())
                            + ' ' 
                            + date.getFullYear() 
                            + ' ' 
                            + date.getHours()
                            + ':'
                            + (
                                (date.getMinutes()-(date.getMinutes() % 10))/10 === 0 
                                ? '0' + date.getMinutes() 
                                : date.getMinutes())} ({duration})
                    </Text>
                </Flex>
            </Flex>
            <Spin spinning={event.isLoading} fullscreen/>
            <ModalWin 
                modalTitle='Редактировать событие'
                modal={modal}
                cancel={() => setModal(false)}
                formContent={fields}
                />
        </Card>
    )

}