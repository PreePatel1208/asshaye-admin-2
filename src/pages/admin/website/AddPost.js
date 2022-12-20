import React,{useState} from 'react'
import { Col, Row, Tabs, Breadcrumb, Button, Space, Modal, Table, Checkbox, Form, Input, Upload, Switch, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { addWebsite, deleteWebsite, editWebsite, getWebsites, restoreWebsite, trashWebsite } from '../../../store/reducer/websiteSlice';
import Ckeditor from '../../../components/Editor/Editor'


const AddPost = () => {
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [logoFile, setLogoFile] = useState(null);
    const [Favicon, setFavicon] = useState(null);
    const [statusVisibility, setStatusVisibility] = useState(true);
    const dispatch = useDispatch()
    const WebsitesData = useSelector((state) => state.website.websites)
    const [isShow, setIsShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [status, setStatus] = useState("all")
    const [text, setText] = useState("Are you sure to delete this website?")
    const [form] = Form.useForm();
    const fileReader = new FileReader()
    const onFinish = async (values) => {
        let baseLogoFile;
        let data
        data = {
            favicon_base64: Favicon ? Favicon : "",
            image_base64: logoFile ? logoFile : "",
            sort: values.sort,
            status: statusVisibility,
            title: values.website
        }

        console.log(data);
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
                if (res.status == 201) {
                    dispatch(getWebsites(status))
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
        setStatusVisibility(key)
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
                <Upload className='theme-form-upload' onRemove={() => setLogoFile(null)} action={(data) => {
                    fileReader.readAsDataURL(data);
                    fileReader.onloadend = () => {
                        setLogoFile(fileReader.result)
                    }
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

            <Form.Item label="Title" name='Title' rules={[
                {
                    required: true,
                    message: 'Please insert title ',
                },
            ]}>
                <Input />
            </Form.Item>
        </Col>
    </Row>
    <Ckeditor />

    <Row gutter={16}>
        <Col span={24} >
            <Form.Item label="id" name="id" hidden>
                <Input />
            </Form.Item>
        </Col>
    </Row>
    <Form.Item label="Status & Visibility">
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