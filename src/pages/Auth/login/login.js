import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Row, Col, Checkbox } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  login } from '../../../store/reducer/UserSlice1';
import { useNavigate } from "react-router-dom";
import Toaster from '../../../components/Toaster/Toaster';
import Logo from '../../../components/Logo/Logo';

const Login = () => {

    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("email") && localStorage.getItem("password") ? true : false)
    const [initValCheck, setInitValCheck] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
    const emailVal = useRef()
    const passVal = useRef()

    useEffect(() => {
        forceUpdate({});
    
        if (emailVal.current.input.value && passVal.current.input.value) {
            setInitValCheck(true)
        } else {
            setInitValCheck(false)
        }

    }, []);

    const onFinish = async (values) => {
        const data = {
            email: values.email,
            password: values.password,
            keepMeAlive: false
        }

        const res = await dispatch(login(data)).unwrap().then(res => {
            console.log("res",res);
            if(res.status==201 || res.status==200){
                setIsShow(true)
                setIsSucess(true)
                setToasterMessage("Login Successfully")
                setTimeout(() => {
                    navigate("/dashboard")
                }, 1000);
            }
        
        }).catch(err => {
            setIsShow(true)
            setIsSucess(false)
            setToasterMessage(err.data.error)
        })
    };
    //check for error
    return (
        <>
            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />

            <Card>
              <Logo/>
                <Form form={form} name="horizontal_login" onFinish={onFinish}

                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    size='large'>
                    <div className='title'>
                        <strong>Login</strong>
                    </div>
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
                            placeholder="Email"
                            type='email'
                            ref={emailVal}
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
                                min: 6,
                                message: "Password must be 6 character"
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            ref={passVal}
                        />
                    </Form.Item>
                    <Form.Item >
                        <Checkbox  onChange={() => { rememberMe ? setRememberMe(false) : setRememberMe(true) }}>
                            Remember Me
                        </Checkbox>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                className={(!initValCheck || form.getFieldsError().filter(({ errors }) => errors.length).length) && (!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length) ? null : 'btn-6'}
                                htmlType="submit"
                                disabled={
                                    (!initValCheck || form.getFieldsError().filter(({ errors }) => errors.length).length) && (!form.isFieldsTouched(true) ||
                                        !!form.getFieldsError().filter(({ errors }) => errors.length).length)
                                }
                                block
                            >
                                Log in <span className='btn-6-span'></span>
                            </Button>
                        )}
                    </Form.Item>
                    <Row justify='space-between'>
                        <Col>
                            <Link to='/auth/registration' className='signUp'>Create an Account</Link>
                        </Col>
                        <Col>
                            <Link to='/auth/forgot-password' className='forgot-pass'>Forgot Password?</Link>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
};
export default Login;