import { 
    Button, 
    Card, 
    Flex, 
    Form, 
    Input, 
    Modal, 
    Popconfirm, 
    Typography,
    message,
} from "antd"

import {
    CloseOutlined,
    EditOutlined,
} from '@ant-design/icons'
import { useState } from "react"

const { Text } = Typography

export default function ObjectCard(props) {

    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState(props.title)

    const updateHandler = async () => {
        try {
            await props.update({body: title, idx: props.id})
            message.success('Объект успешно обновлён!')
        } catch (e) {
            message.error(e?.message)
            console.log(e)
        }
    }

    const cancelHandler = () => {
        setModal(false)
        setTitle(props.title)
    }

    const deletehandler = async () => {
        try {
            await props.delete(props.id)
            message.success('Объект успешно удалён!')
        } catch (e) {
            message.error(e?.message)
            console.log(e?.message)
        }
    }

    return (

        <Card>
            <Flex justify="space-between" align="center">
                <Text>{props.title}</Text>
                <Flex gap='.5rem'>
                    <Button onClick={() => setModal(true)}><EditOutlined/></Button>
                    <Popconfirm
                            title='Удалить объект'
                            description='Вы действительно хотите удалить объект?'
                            onConfirm={deletehandler}
                            okText="Да"
                            cancelText="Нет">
                        <Button danger><CloseOutlined/></Button>
                    </Popconfirm>
                </Flex>
            </Flex>
            <Modal 
                title='Редактировать объект'
                open={modal} 
                onCancel={cancelHandler}
                onOk={updateHandler}>
                <Form>
                    <Form.Item id={'edit'}>
                        <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>

    )

}