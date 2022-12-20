import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { NumberOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../../store/reducer/UserSlice1';
import Toaster from '../../../components/Toaster/Toaster';

const EmailVerification = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)


    const onFinish = async (values) => {
        const data = {
            email: "ppa@narola.email",
            activation_code: values.verification_code
        }
        await dispatch(verifyEmail(data)).then(res => {
            if (res.payload.status == 200) {
                setIsShow(true)
                setIsSucess(true)
                setToasterMessage(res.payload.data.message + "Verify successfully")
                setTimeout(() => {
                    navigate("/auth/login")
                }, 1000);


            } else {
                setIsShow(true)
                setIsSucess(false)
                setToasterMessage(res.payload.data.message)
            }
        }).catch(err => {

        })

    };


    return (
        <div>
            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />
            <Card>
                <Form form={form} name="horizontal_login" onFinish={onFinish} size='large'>
                    <Form.Item
                        name="verification_code"
                        rules={[
                            {
                                required: true,
                                message: 'Please insert  Verification code',
                            }
                        ]}
                    >
                        <Input prefix={<NumberOutlined className="site-form-item-icon" />} placeholder="Enter Verification code" type='number' />
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

                </Form>
            </Card>
        </div>
    );
}

export default EmailVerification;
