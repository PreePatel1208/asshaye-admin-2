import React,{useState} from 'react'
import { Col, Row, Tabs, Breadcrumb, Button, Space, Modal, Table, Checkbox, Form, Input, Upload, Switch, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { addWebsite, deleteWebsite, editWebsite, getWebsites, restoreWebsite, trashWebsite } from '../../../store/reducer/websiteSlice';
import Ckeditor from '../../../components/Editor/Editor'


const AddPost = () => {
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [body, setBody] = useState(false);
    const [thubnailFile, setThumbnailFile] = useState(null);
    const [commentStatus, setCommentStatus] = useState(true);
    const dispatch = useDispatch()
    const [isShow, setIsShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
   
    const [form] = Form.useForm();
    const onFinish = async (values) => {
   
        let data =new FormData()
        
        data.append("body",body) 
        data.append("image",thubnailFile) 
        data.append("slug",values.slug) 
        data.append("comment_status",commentStatus) 
        data.append("title",values.title) 

        if (isEdit) {
            data = [data, { id: values.id }];
            await dispatch(editWebsite(data)).unwrap().then(res => {
                console.log("res edit", res);
                setIsShow(true)
                if (res.status == 200) {
                    setIsSucess(true)
                    setToasterMessage("Website edited sucessfully")
                } else {
                    setIsSucess(false)
                    setToasterMessage(res.data.message)
                }
                setIsEdit(false)
                setIsAddModalOpen(false)
            }).catch(err => {
                setToasterMessage(err.data.message)
            })


        } else {
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
                <Input />
            </Form.Item>
        </Col>
    </Row>

    <Row gutter={16}>
        <Col span={24} >
            <Form.Item label="Slug" name='slug' rules={[
                {
                    required: true,
                    message: 'Please insert slug ',
                },
            ]}>
                <Input />
            </Form.Item>
        </Col>
    </Row>
    <Ckeditor {...{setBody}} />

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

    <Form.Item
        className='text-center submit-btn'
    >
        <Button type="primary" htmlType="submit" className='border-hover border-primary'>
            Submit
        </Button>
    </Form.Item>
</Form> 
</div>
  )
}

export default AddPost