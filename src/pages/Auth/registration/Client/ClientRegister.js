import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Card,
    Row,
    Col,
    Select,
} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Toaster } from '../../../../components/Toaster/Toaster'
import CommonRegisterForm from '../PersonalDetail';
import { getCountry } from '../../../../store/reducer/countrySlice';
import { getWebsites } from '../../../../store/reducer/websiteSlice';


const ClientRegister = () => {

    const [form] = Form.useForm();
    const { id } = useParams();
    const [, forceUpdate] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
    const [clientType, setClientType] = useState(null)
    const countries = useSelector((state) => state.country.countries)
    const websites = useSelector((state) => state.website.websites)

    useEffect(() => {
      
        dispatch(getCountry())
        dispatch(getWebsites())
    }, [])

    const onFinish = async (values) => {
        alert("hii")
        navigate(`/auth/personal-detail`)

    };
    return (
        <>
            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />

            <Card title="Intitute info">
                <Form form={form} name="horizontal_login" onFinish={onFinish} size='large'>
                    <Form.Item name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            }
                        ]}>
                        <Select value='1' placeholder="Client as" onChange={(e) => { setClientType(e) }}>
                            <Select.Option value='1' selected="selected">Corporate</Select.Option>
                            <Select.Option value='2'>Instructor</Select.Option>
                        </Select>
                    </Form.Item>

                  

                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                className={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length ? null : 'btn-6'}
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                                block
                            >
                                Continue <span className='btn-6-span'></span>
                            </Button>
                        )}
                    </Form.Item>

                </Form>
            </Card>
        </>
    )
}

export default ClientRegister