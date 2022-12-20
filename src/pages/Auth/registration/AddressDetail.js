import React, { useEffect } from 'react'
import {
    Button,
    Form,
    Input,
    Row,
    Col,
    Select,
    Card,
 
} from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { next, prev } from '../../../store/reducer/StepSlice';
import Logo from '../../../components/Logo/Logo';
import { getCountry } from '../../../store/reducer/countrySlice';

const Step3 = ({formData,setFormData}) => {
    const countries = useSelector((state) => state.country.countries)
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const onFinish = () => {
        
    }
    const intialVal = {
        country_code : formData.country,
        state: formData.state,
        street_adress: formData.streetAddress,
        city: formData.city,
        pincode: formData.zipcode,
    }

    useEffect(() => {
    dispatch(getCountry())
    }, [])
    
    return (
        <>
            <Card >
                <Logo/>
                <Form form={form} name="horizontal_login" onFinish={onFinish} size='large'
                initialValues={intialVal}
                >
                <div className='title'>
                        <strong>Adress detail</strong>
                    </div>
                    <Form.Item name="country_code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            }
                        ]}>
                        <Select placeholder="Select Country"   onChange={(e) =>
                            { setFormData({ ...formData, country: e }); } //setting the formData to the value input of the textfield 
                           }
                           >
                            {countries && countries.map(data => {
                                return <Select.Option value={data.key} key={data.key}>{data.title}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="state"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Name state!',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                        onChange={(e) =>
                            { setFormData({ ...formData, state: e.target.value }); } }
                        placeholder="State" />
                    </Form.Item>
                    <Form.Item
                        name="street_adress"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Name street address!',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                         onChange={(e) =>
                            { setFormData({ ...formData, streetAddress: e.target.value }); } }
                        placeholder="Street Address" />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Name city',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                        onChange={(e) =>
                            { setFormData({ ...formData, city: e.target.value }); } }
                        placeholder="City" />
                    </Form.Item>
                    <Form.Item
                        name="pincode"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Name pincode!',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                         onChange={(e) =>
                            { setFormData({ ...formData, zipcode: e.target.value }); } }
                        placeholder="Pincode" />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                className='btn-6'
                                htmlType="submit"
                                block
                            >
                                Submit <span className='btn-6-span'></span>
                            </Button>
                        )}
                    </Form.Item>
                </Form>
        <a  onClick={()=>{dispatch(prev())}}>Back</a>
               
            </Card>
        </>
    )
}

export default Step3