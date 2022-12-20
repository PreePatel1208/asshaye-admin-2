import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from '../../../components/Toaster/Toaster';
import {  resetPassword } from '../../../store/reducer/UserSlice1';

const ResetPassword = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
    const email = useSelector((state) => state.users.forgotPasswordMail)

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async (values) => {

        const data = {
            email: email,
            token: values.token,
            new_password: values.password,
            new_password_confirmation: values.cpassword
        }
        if (email) {
            await dispatch(resetPassword(data)).unwrap().then(res => {
                if (res.status == 200) {
                    setIsShow(true)
                    setIsSucess(true)
                    setToasterMessage("password reset successfully")
                    setTimeout(() => {
                        navigate("/auth/login")

                    }, 1500);
                } else {
                    setIsShow(true)
                    setIsSucess(false)
                    setToasterMessage(res.data.message)
                }
            }).catch(err => {

            })

        } else {
            setIsShow(true)
            setIsSucess(false)
            setToasterMessage("Please send Mail first ")
            setTimeout(() => {
                navigate("/auth/forgot-password")
            }, 1500);

        }


    };



    return (
        <>
            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />
            <Card title="Reset Password">
                <Form form={form} name="horizontal_login" onFinish={onFinish} size='large'>
                    <Form.Item
                        name="token"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your token!',
                            },
                            {
                                min: 8,
                                message: "token Lenght must be morethan 8 character"
                            },

                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="number"
                            placeholder="Enter Token"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 8,
                                message: "Password Lenght must be morethan 8 character"
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Create Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="cpassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            })
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                        />
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
                    <Link to='/auth/forgot-password'>Send Mail</Link>
                </Form>
            </Card>
        </>
    );
};
export default ResetPassword;