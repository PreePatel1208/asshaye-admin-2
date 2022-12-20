import React, { useEffect, useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addResetMail, forgotPassword } from '../../../store/reducer/UserSlice1';
import Toaster from '../../../components/Toaster/Toaster';
import Logo from '../../../components/Logo/Logo';

const ForgotPassword = () => {

    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async (values) => {
        const data = {
            email: values.Email
        }

        await dispatch(forgotPassword(data)).unwrap().then(res => {
            if (res.status == 201) {
                setIsShow(true)
                setIsSucess(true)
                setToasterMessage("Email Successfully sent,Please Reset your password")

                dispatch(addResetMail(values.Email))
                setTimeout(() => {
                    navigate("/auth/reset-password");
                }, 1000);

            }
            else {
                setIsShow(true)
                setIsSucess(false)
                setToasterMessage(res.data.message)
            }
        })
            .catch(err => {

            })

    };

    return (

        <>
            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />
            <Card>
                <Logo />
                <Form form={form} name="horizontal_login" onFinish={onFinish} size='large'>
                    <div className='title'>
                        <strong>Set Email</strong>
                    </div>
                    <Form.Item
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type='email' />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                className={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length ? null : 'btn-6'}
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                                block
                            >
                                Submit <span className='btn-6-span'></span>
                            </Button>
                        )}
                    </Form.Item>
                    <Link to='/auth/login'>Login</Link>
                </Form>
            </Card>
        </>
    );
}

export default ForgotPassword;
