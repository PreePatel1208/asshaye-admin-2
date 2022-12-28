import React, { useEffect, useState } from 'react'
import { Col, Row, Tabs, Breadcrumb, Button, Space, Modal, Table, Checkbox, Form, Input, Upload, Switch, Select, Popconfirm, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { addWebsite, deleteWebsite, editWebsite, getSinglePost, getWebsites, restoreWebsite, slugCheck, trashWebsite } from '../../../store/reducer/websiteSlice';
import Ckeditor from '../../../components/Editor/Editor'
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import { useRoutes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {

    // Get ID from URL
    const params = useParams();
    // console.log("params", params);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [body, setBody] = useState(false);
    const [thubnailFile, setThumbnailFile] = useState(null);
    const [commentStatus, setCommentStatus] = useState(true);
    const dispatch = useDispatch()
    const nevigate = useNavigate()
    const [isShow, setIsShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
    const [isSlug, setIsSlug] = useState(false)
    const [slug, setSlug] = useState(false)

    const dateFormat = '[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]';
const [date, setDate] = useState(null)

    const [form] = Form.useForm();
    
    const handleSlugChange=async(val)=>{
        setTimeout(async() => {
            await dispatch(slugCheck(val)).unwrap().then(res => {
                console.log("res edit", res);
           
                if (res.status == 200||res.status == 201) {
                    setIsSlug(true)
                } else {
                    setIsSlug(false)
                }
             
            }).catch(err => {
              
            })
        }, 2000);
       
    }
    const hadleTitleChange=async(e)=>{

        handleSlugChange( e.target.value.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    )
        form.setFieldsValue({
            slug: e.target.value.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
        });
    }

    useEffect(() => {
        if (params) {
            dispatch(getSinglePost(params.id)).then((res)=>{
               if(res.payload.status==401){
                nevigate("/auth/login")
               }
              if(res.payload.status==200||res.payload.status==201){
                const data=res.payload.data.data  
                setBody(data.body)
             setSlug(data.slug)
                form.setFieldsValue({
                    title:data.title,
                    slug:data.slug
                });
              }

            }).catch((err)=>{
                console.log("err",err);
            })
          
        }
    }, [params])

    const onFinish = async (values) => {

        let data= new FormData()

        data.append("body", body)
        data.append("image", thubnailFile)
        data.append("slug", slug)
        data.append("comment_status", commentStatus)
        data.append("title", values.title)

        if (params.id) {
            const editData={
                data:data,
                id:params.id
            }
            await dispatch(editWebsite(editData)).unwrap().then(res => {
                console.log("res edit", res);
                setIsShow(true)
                if (res.status == 200||res.status == 201) {
                    alert("success")
                    setIsSucess(true)
                    setToasterMessage("post edited sucessfully")
                } else {
                    setIsSucess(false)
                    setToasterMessage(res.data.message)
                }
                setIsEdit(false)
                setIsAddModalOpen(false)
            }).catch(err => {
                // setToasterMessage(err.data.message)
                console.log("err",err);
            })


        } else {
            alert(2)

            await dispatch(addWebsite(data)).unwrap().then(res => {
                console.log("res add", res);
                setIsShow(true)
                setIsSucess(true)
                if (res.status == 200) {

                    setToasterMessage("Website added sucessfully")
                    setIsAddModalOpen(false)
                } else {
                    setToasterMessage(res.data.message)
                }
            }).catch(err => {
                console.log("err add", err);
                setIsShow(true)
                setIsSucess(false)
                setToasterMessage(err.data.message)
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const changeStatus = (key) => {
        setCommentStatus(key)
    };
    return (
        <div className='website-block theme-block'>
            <Form form={form} onFinish={onFinish}
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size='large'>
                <Row gutter={16} justify='center'>
                    <Col span={24} className='text-center'>
                        <Space>
                            <Upload className='theme-form-upload' onRemove={() => setThumbnailFile(null)} action={(data) => {
                                setThumbnailFile(data)
                            }} listType="picture-card" maxCount={1}>
                                <div>
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload Thumbnail (210*100)
                                    </div>
                                </div>
                            </Upload>

                        </Space>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={24} >
                        <Form.Item label="Title" name='title' rules={[
                            {
                                required: true,
                                message: 'Please insert title ',
                            },
                        ]}>
                            <Input onChange={(e)=>{hadleTitleChange(e)}} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24} >
                        <Form.Item label="Slug" name='slug' rules={[
                            {
                                required: true,
                          message      : 'Please insert slug ',
                            },
                        ]}
                        >
                            <Input value={slug} onChange={(e)=>{setSlug(e.target.value);handleSlugChange(e.target.value)}}/>
                           
                        </Form.Item>
                         <p style={{color:"red"}}>{isSlug?"Slug is exists":""}</p>
                    </Col>
                </Row>
                <Ckeditor {...{ body,setBody }} />

                <Row gutter={16}>
                    <Col span={24} >
                        <Form.Item label="id" name="id" hidden>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Public Comment">
                    <Switch defaultChecked onChange={changeStatus} />
                </Form.Item>

                {/* <DatePicker defaultValue={date} format={dateFormat} /> */}

                <Form.Item
                    className='text-center submit-btn'
                >
                    <Button type="primary" htmlType="submit" className='border-hover border-primary' 
                        disabled={
                           isSlug
                        }
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddPost