import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Card,
} from 'antd';
import { useDispatch } from 'react-redux';
import { next, prev } from '../../../store/reducer/StepSlice';
import Logo from '../../../components/Logo/Logo';

const Step2 = ({ formData, setFormData }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        dispatch(next())
    };
    const intialVal = {
        username : formData.userName,
        email: formData.email,
        Phone: formData.phoneNo,
        password: formData.password,
        cpassword: formData.cpassword,
        institue_name: formData.instituteName,
        website_url: formData.websiteUrl
    }
    return (
        <>
            <Card >
                <Logo />
                    <Form form={form} name="horizontal_login" onFinish={onFinish} size='large'
                    initialValues={intialVal}
                    >
                    <div className='title'>
                        <strong>PersonalDetail</strong>
                    </div>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your User Name!',
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                onChange={(e) => { setFormData({ ...formData, userName: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
                                placeholder="Enter User Name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
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
                            <Input prefix={<MailOutlined className="site-form-item-icon" />}
                                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
                                placeholder="Email" type='email' />
                        </Form.Item>

                        <Form.Item
                            name="Phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Name Phone number!',
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                onChange={(e) => { setFormData({ ...formData, phoneNo: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
                                placeholder="Phone number" />
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
                                onChange={(e) => { setFormData({ ...formData, password: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
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
                                onChange={(e) => { setFormData({ ...formData, cpassword: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
                            />
                        </Form.Item>

                        <Form.Item shouldUpdate>
                            {() => (
                                <Button
                                    className='btn-6'
                                    type="primary"
                                    htmlType="submit"
                                    block
                                >
                                    Continue <span className='btn-6-span'></span>
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                    <a onClick={() => { dispatch(prev()) }}>Back</a>
            </Card>


        </>
    )
}

export default Step2