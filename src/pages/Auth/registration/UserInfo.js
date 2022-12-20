import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from "react-router-dom";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

import {
    Form,
    Button,
    Card,
    Select,
    Input,
    Col,
    Row,

} from 'antd';
import { useDispatch } from 'react-redux';
import { next } from '../../../store/reducer/StepSlice';
import Logo from '../../../components/Logo/Logo';

const Step1 = ({ formData, setFormData }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        dispatch(next())

    };
    const intialVal = {
        type: formData.userType,
        client_type: formData.clientType,
        full_name: formData.fullName,
        owner: formData.ownerOfInstitute,
        institue_name: formData.instituteName,
        website_url: formData.websiteUrl
    }
    return (

        <Card>
            <Logo />

            <Form form={form} name="horizontal_login" onFinish={onFinish} size='large'
                initialValues={intialVal}
            >
                <div className='title'>
                    <strong>Registration</strong>
                </div>
                <Form.Item name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your user type!',
                        }
                    ]}>
                    <Select placeholder="Register as a" onChange={(e) => {
                        setFormData({ ...formData, userType: e });
                    }}>
                        <Select.Option value='1'>Client</Select.Option>
                        <Select.Option value='2'>Agent</Select.Option>
                        <Select.Option value='3'>Employee</Select.Option>
                        <Select.Option value='4'>Student</Select.Option>
                    </Select>
                </Form.Item>
                {formData.userType == 1 &&
                    <Form.Item name="client_type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            }
                        ]}>
                        <Select placeholder="Client as" onChange={(e) => {
                            setFormData({ ...formData, clientType: e });
                        }}>
                            <Select.Option value='1' >Corporate</Select.Option>
                            <Select.Option value='2'>Instructor</Select.Option>
                        </Select>
                    </Form.Item>
                }

                {formData.clientType == 1 &&
                    <>
                        <Form.Item
                            name="owner"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Owner of Institute!',
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                onChange={(e) => { setFormData({ ...formData, ownerOfInstitute: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
                                placeholder="Owner of Institute" />
                        </Form.Item>


                        <Form.Item
                            name="institue_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Name of institute!',
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                onChange={(e) => { setFormData({ ...formData, instituteName: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
                                placeholder="Name of institute" />

                        </Form.Item>

                        <Form.Item
                            name="website_url"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Website Url!',
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                onChange={(e) => { setFormData({ ...formData, websiteUrl: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
                                placeholder="Website Url" />
                        </Form.Item>
                    </>
                }
                {formData.clientType == 2 &&
                    <>
                        <Form.Item
                            name="full_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Full Name of intructor!',
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                onChange={(e) => { setFormData({ ...formData, fullName: e.target.value }); } //setting the formData to the value input of the textfield 
                                }
                                placeholder="Full Name" />
                        </Form.Item>
                    </>
                }
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            className='btn-6'
                            htmlType="submit"
                            block
                        >
                            Continue <span className='btn-6-span'></span>
                        </Button>
                    )}
                </Form.Item>
                <Row justify='space-between'>
                        <Col>
                            <Link to='/auth/login' className='signUp'>Login</Link>
                        </Col>
                        
                    </Row>
            </Form>
        </Card>
    )
}

export default Step1