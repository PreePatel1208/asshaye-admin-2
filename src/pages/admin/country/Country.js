
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Radio, Tabs, Breadcrumb, Button, Space, Modal, Table, Checkbox, Form, Input, Upload, Switch, Select, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, RadiusBottomleftOutlined, UndoOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { addCountry, deleteCountry, editCountry, getCountry, restoreCountry, trashCountry } from '../../../store/reducer/countrySlice';
import Toaster from '../../../components/Toaster/Toaster';
import Sample from './../../../assets/img/sample.png'

const Country = () => {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [statusVisibility, setStatusVisibility] = useState(true);
    const dispatch = useDispatch()
    const WebsitesData = useSelector((state) => state.website.websites)
    const countriesData = useSelector((state) => state.country.countries)
    const [isShow, setIsShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
    const [status, setStatus] = useState("active")
    const [text, setText] = useState("Are you sure to delete this country?")
    const [dataSource, setDataSource] = useState([])
    const [form] = Form.useForm();


    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const onChange = (key) => {
        setStatus(key)
        if(key=='trash'){
            setText("Are you sure to delete this country permanant?") 
        }else{
            setText("Are you sure to delete this country?")
        }
        dispatch(getCountry(key))
    };
    const changeStatus = (key) => {
        setStatusVisibility(key)
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };
    const restoreCountryeDetail = async (id) => {
        await dispatch( restoreCountry(id)).unwrap().then(res => {
            setIsShow(true)
            setIsSucess(true)
            if (res.status == 200) { 
                setToasterMessage("Website restore sucessfully")
                setIsAddModalOpen(false)
            } else {
                setToasterMessage(res.data.message)
            }
        }).catch(err => {
            console.log("err", err);
            setIsShow(true)
            setIsSucess(false)
            setToasterMessage(err.data.message)
        })
    }

    const deleteCountryDetail = async (id) => {
        await dispatch(status!="trash"? trashCountry(id):deleteCountry(id)).unwrap().then(res => {
            setIsShow(true)
            setIsSucess(true)
            if (res.status == 200) {
                setToasterMessage("Country deleted sucessfully")
                setIsAddModalOpen(false)
            } else {
                setToasterMessage(res.data.message)
            }
        }).catch(err => {
            console.log("err", err);
            setIsShow(true)
            setIsSucess(false)
            setToasterMessage(err.data.message)
        })
    }

    const editCountryDetail = async (element) => {
        setIsEdit(true)
        setIsAddModalOpen(true)
        console.log("element", element);
        form.setFieldsValue({
            name: element.title,
            sort: element.sort,
            short_name: element.short_title,
            country_code: element.ccode,
            id: element.encrypt_id
        });
    }
    const { Option } = Select;
    useEffect(() => {
        setDataSource(countriesData?.map(element => (
            {
                key: element.id,
                image: element.image?.url,
                name: element.title,
                code: element.ccode,
                url: 'aips',
                sort: element.sort,
                updated_at: <div dangerouslySetInnerHTML={{ __html: element.updated_at }} />,
                logo: <img src={Sample} alt="" />,
                action: <div><Button onClick={() => {
                    editCountryDetail(element)
                }} className="action-btn edit-btn" ><EditOutlined /></Button> <Popconfirm placement="right" title={text} onConfirm={()=>{ const id=element.id; deleteCountryDetail(id)}} okText="Yes" cancelText="No"> <Button      
                   className="action-btn delete-btn" > <DeleteOutlined /> </Button> </Popconfirm>
                   <Button     
                    className="action-btn delete-btn" 
                    onClick={()=>{const id=element.id; restoreCountryeDetail(id)}} hidden={status=="trash"?false:true}
                    ><UndoOutlined /></Button>
                   </div>
            })))
    }, [countriesData])

    const columns = [
        {
            title: 'logo',
            dataIndex: 'logo',
            key: 'logo',
            ellipsis: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            onFilter: (value, record) => record.code.includes(value),
            sorter: (a, b) => a.code.length - b.code.length,
            sortOrder: sortedInfo.columnKey === 'code' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Sort',
            dataIndex: 'sort',
            key: 'sort',
            filteredValue: filteredInfo.sort || null,
            onFilter: (value, record) => record.sort.includes(value),
            sorter: (a, b) => a.sort - b.sort,
            sortOrder: sortedInfo.columnKey === 'sort' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date',
            dataIndex: 'updated_at',
            key: 'updated_at',
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            ellipsis: true,
        },
    ];


    const onFinish = async (values) => {
        console.log("values", values);

        let data
        data = {
            "ccode": values.country_code,
            "short_title": values.short_name,
            "sort": values.sort,
            "status": statusVisibility,
            "title": values.name,
        }
        if (isEdit) {

            data = [data, { id: values.id }];
            await dispatch(editCountry(data)).unwrap().then(res => {
                console.log("res edit", res);
                setIsShow(true)
                if (res.status == 200) {
                    dispatch(getCountry(status))
                    setIsSucess(true)
                    setToasterMessage("Country edited sucessfully")
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
            await dispatch(addCountry(data)).unwrap().then(res => {
                console.log("res add", res);
                setIsShow(true)
                setIsSucess(true)
                if (res.status == 201) {
                    dispatch(getCountry(status))
                    setToasterMessage("Country added sucessfully")
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
    const onUpdateClick = (id) => {
        console.log(id);
    }
    const onDeleteClick = (id) => {
        console.log(id);
    }

    console.log(status);

    return (
        <>
            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />
            <div className='title-with-btn'>
                <div className='title'>
                    <strong>Country</strong>
                </div>
                <Button type="default" icon={<PlusOutlined />} size='middle' onClick={() => {
                    setIsAddModalOpen(true);
                    form.setFieldsValue({
                        name: '',
                        sort: '',
                        short_name: '',
                        country_code: '',
                    });
                }}>Add New</Button>
            </div>

            <Breadcrumb>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Country</Breadcrumb.Item>
            </Breadcrumb>
            <div className='website-block theme-block'>
                <Tabs
                    className='theme-tab'
                    defaultActiveKey="1"
                    onChange={onChange}
                    items={[
                        {
                            label: `All`,
                            key: 'all',

                        },
                        {
                            label: `Active`,
                            key: 'active',

                        },
                        {
                            label: `Inactive`,
                            key: 'inactive',

                        },
                        {
                            label: `Trash`,
                            key: 'trash',

                        },
                    ]}
                />
                <Table className='theme-table' rowSelection={{
                    type: Checkbox,

                }} columns={columns} dataSource={dataSource} onChange={handleChange} />
            </div>

            <Modal className='theme-modal' form={form} width={800} centered title="Add Country" open={isAddModalOpen} onOk={() => setIsAddModalOpen(false)} onCancel={() => setIsAddModalOpen(false)} footer={null}>

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
                    <Row gutter={16}>
                        <Col span={24} >

                            <Form.Item label="Country Code" name='country_code' rules={[
                                {
                                    required: true,
                                    message: 'Please insert country code',
                                },
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24} >
                            <Form.Item label="Name" name='name' rules={[
                                {
                                    required: true,
                                    message: 'Please insert country name',
                                },
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24} >
                            <Form.Item label="Short Name" name='short_name' rules={[
                                {
                                    message: 'Please insert Short name',
                                },
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24} >
                            <Form.Item label="Sort" name="sort">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
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
            </Modal>
        </>
    );
}

export default Country;
