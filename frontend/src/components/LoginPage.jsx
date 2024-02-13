import { Button, Form, Input, Layout, Typography, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm } from 'antd/es/form/Form';
import { useLoginMutation } from "../store/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/adminSlice";

const { Text } = Typography

export default function LoginPage() {

    const dispatch = useDispatch()
    const [sendLogin, { isLoading }] = useLoginMutation()

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
    }
    
    const [form] = useForm()
    const navigate = useNavigate()

    const loginHandler = async (values) => {
        try {
            await form.validateFields()
            if (!values.login || !values.password) {
                message.error('Ошибка входа!')
                return
            }
            const credentials = {
                login: values.login, 
                password: values.password
            }
            await sendLogin(credentials).then(res => {
                if (!res.error) {
                    dispatch(setCredentials(res.data))
                    navigate('admin')
                } else {
                    throw new Error(res.error)
                }
            })
        } catch (e) {
            message.error('Неверные двнные!')
            console.log(e)
        }
    }

    return (

        <Layout style={{
            height: '100vh',
            padding: '1rem',
          }}>
            <Text 
                level={4} 
                style={{
                    color: '#1677ff',
                    fontSize: '1.5rem'
                }}>
                Shedule Admin
            </Text>
            <Form
                {...formItemLayout}
                layout='vertical'
                form={form}
                onFinish={() => loginHandler(form.getFieldsValue())}
                onFinishFailed={() => message.error('Ошибка входа')}>
                <Form.Item
                    label='Логин'
                    name='login'
                    rules={[{ required: true, message: 'Введите логин!' }]}
                    validateTrigger={'onBlur'}>
                    <Input autoComplete='disabled'/>
                </Form.Item>
                <Form.Item
                    label='Пароль'
                    name='password'
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                    validateTrigger={'onBlur'}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
            <Spin spinning={isLoading} fullscreen/>
        </Layout>

    )

}
