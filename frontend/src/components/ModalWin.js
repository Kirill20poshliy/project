import { Modal, Form, Input, DatePicker, Select, Checkbox, TimePicker, Spin, message } from 'antd'

import { 
    useCreateEventMutation, 
    useGetGroupsQuery, 
    useGetSpeakersQuery, 
    useGetTypesQuery, 
    useUpdateEventMutation 
} from '../store/api';

import { useForm } from 'antd/es/form/Form';

import dayjs from 'dayjs'

export default function ModalWin(props) {

    const {modalTitle, modal, cancel, formContent} = props

    const format = 'HH:mm';

    const initialValues = {
        subject: formContent?.subject,
        speaker: formContent?.speaker || 6,
        type: formContent?.type || 4, 
        group: formContent?.group || 6,
        canceled: formContent?.canceled,
        link: formContent?.link,
        date: dayjs(formContent?.date),
        time: dayjs(formContent?.time),
        duration: dayjs(formContent?.duration || '1:20', 'HH:mm')
    }

    const groups = useGetGroupsQuery()
    const speakers = useGetSpeakersQuery()
    const types = useGetTypesQuery()

    const [createEvent, event] = useCreateEventMutation()
    const [updateEvent, uevent] = useUpdateEventMutation()

    const eventHandler = async (values) => { 
        try {
            await form.validateFields()
            const body = {
                title: values.subject,
                datetime: new Date(
                    values.date.$y,
                    values.date.$M,
                    values.date.$D,
                    values.time.$H,
                    values.time.$m,
                    ),
                duration: `${values.duration.$H}:${values.duration.$m}:00`,
                link: values.link,
                canceled: values.canceled,
                GroupId: Number(values.group),
                SpeakerId: Number(values.speaker),
                TypeId: Number(values.type),
            }

            if (modalTitle === 'Добавить событие') {
                const create = await createEvent(body)
                if (!create) {
                    message.error(event.error)
                }
                form.resetFields()
                cancel()
                message.success('Событие создано!')
            }

            if (modalTitle === 'Редактировать событие') {
                const update = await updateEvent({body: body, id: formContent.id})
                if (!update) {
                    message.error(uevent.error)
                }
                message.success('Событие изменено!')
            }
        } catch (e) {
            message.error('Заполните обязательные поля!')
            console.log(e)
        }

    }

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      };

    const [form] = useForm()

    return (

        <Modal
            title={modalTitle}
            open={modal}
            style={{ top: '1rem' }}
            onOk={() => eventHandler(form.getFieldsValue())}
            confirmLoading={event.isLoading}
            onCancel={cancel}
            >
            <Form
                {...formItemLayout}
                layout='vertical'
                form={form}
                initialValues={initialValues}>                
                <Form.Item 
                    label='Предмет:' 
                    name='subject'
                    rules={[{ required: true, message: 'Введите название предмета!' }]}
                    validateTrigger={'onBlur'}>
                    <Input/>
                </Form.Item>
                <Form.Item label='Преподаватель:' name='speaker'>
                    <Select
                        options={
                            speakers.isSuccess 
                            ? speakers.data.data.map(speaker => ({
                                value: speaker.id,
                                label: speaker.name,
                            }))
                            : 'Загрузка...'
                        }
                    />
                </Form.Item>
                <Form.Item label='Тип:' name='type'>
                    <Select
                        options={
                            types.isSuccess 
                            ? types.data.data.map(type => ({
                                value: type.id,
                                label: type.name,
                            }))
                            : 'Загрузка...'
                        }
                    />
                </Form.Item>
                <Form.Item label='Группа:' name='group'>
                    <Select
                        options={
                            groups.isSuccess 
                            ? groups.data.data.map(group => ({
                                value: group.id,
                                label: group.code,
                            }))
                            : 'Загрузка...'
                        }
                    />
                </Form.Item>
                <Form.Item 
                    label='Дата:' 
                    name='date'
                    rules={[{ required: true, message: 'Введите дату события!' }]}
                    validateTrigger={'onBlur'}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item 
                    label='Время:' 
                    name='time'
                    rules={[{ required: true, message: 'Введите время события!' }]}
                    validateTrigger={'onBlur'}>
                    <TimePicker
                        format={format}/>
                </Form.Item>
                <Form.Item 
                    label='Продолжительность:' 
                    name='duration'
                    rules={[{ required: true, message: 'Введите продолжительность события!' }]}
                    validateTrigger={'onBlur'}>
                    <TimePicker
                        format={format}/>
                </Form.Item>
                <Form.Item label='Ссылка на подключение:' name='link'>
                    <Input/>
                </Form.Item>
                <Form.Item name='canceled' valuePropName="checked">
                    <Checkbox>Отменено</Checkbox>
                </Form.Item>
            </Form>
            <Spin spinning={event.isLoading || uevent.isLoading} fullscreen/>
        </Modal>

    )


}