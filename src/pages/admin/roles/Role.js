
import React, { useEffect, useState } from 'react';
import { Col, Row, Tabs, Breadcrumb, Button, Table, Checkbox, Form, Input, Switch, Select, Drawer, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { addWebsite, deleteWebsite, editWebsite, getWebsites } from '../../../store/reducer/websiteSlice';
import Toaster from '../../../components/Toaster/Toaster';
import GroupCheckbox from '../../../components/form-component/GroupCheckbox';
import { addRole, deleteRole, getRole, restoreRole, setIsEdit, trashRole, updaterole } from '../../../store/reducer/roleSlice';
import { resetCheckList, setCheckList } from '../../../store/reducer/permissionSlice';

const Role = () => {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const checkList = useSelector((state) => state.permission.checkedList)
    const isEdit = useSelector((state) => state.role.isEdit)
    const roles = useSelector((state) => state.role.roles)
    const [isShow, setIsShow] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [status, setStatus] = useState("all")
    const [text, setText] = useState("Are you sure to delete this website?")
    const [form] = Form.useForm();

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const onChange = (key) => {
        setStatus(key)
        if(key=='trash'){
            setText("Are you sure to delete this website permanant?") 
        }else{
            setText("Are you sure to delete this website?")
        }
        dispatch(getRole(key))
    };

    const deleteRoleDetail = async (id) => {
        await dispatch(status!="trash"? trashRole(id):deleteRole(id)).unwrap().then(res => {
            setIsShow(true)
            setIsSucess(true)
            if (res.status == 200) {
                setToasterMessage("Role deleted sucessfully")

            } else {
                setToasterMessage(res.data.message)
            }
        }).catch(err => {
            setIsShow(true)
            setIsSucess(false)
            setToasterMessage(err.data.message)
        })
    }

    
    const restoreRoleDetail = async (id) => {
        await dispatch(restoreRole(id)).unwrap().then(res => {
            setIsShow(true)
            setIsSucess(true)
            if (res.status == 200) {
                setToasterMessage("Role restored sucessfully")
            } else {
                setToasterMessage(res.data.message)
            }
        }).catch(err => {
            setIsShow(true)
            setIsSucess(false)
            setToasterMessage(err.data.message)
        })
    }

    const editWebsiteDetail = async (element) => {
        dispatch(setCheckList(element.permissions_ids))
        dispatch(setIsEdit())
        setOpen(true)
        form.setFieldsValue({
            name: element.name,
            id: element.encrypt_id
        });
    }

    useEffect(() => {
        dispatch(getRole())
    }, [])

    useEffect(() => {
        setDataSource(roles?.map(element => (
            {
                key: element.id,
                name: element.name,
                user_no: element.count_no,
                updated_at: <div dangerouslySetInnerHTML={{ __html: element.updated_at }} />,
                action: <div><Button onClick={() => {
                    editWebsiteDetail(element)
                }} className="action-btn edit-btn" ><EditOutlined /></Button>  
                <Popconfirm placement="right" title={text} onConfirm={()=>{ const id=element.id; deleteRoleDetail(id)}} okText="Yes" cancelText="No">
                    <Button     
                className="action-btn delete-btn" ><DeleteOutlined /></Button> </Popconfirm> <Button     
                className="action-btn delete-btn" 
                onClick={()=>{const id=element.id; restoreRoleDetail(id)}} hidden={status=="trash"?false:true}
                ><UndoOutlined   /></Button> </div>
            })))
    }, [roles])

    const columns = [

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
            filteredValue: filteredInfo.website || null,
            onFilter: (value, record) => record.website.includes(value),
            sorter: (a, b) => a.website.length - b.website.length,
            sortOrder: sortedInfo.columnKey === 'website' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'User No',
            dataIndex: 'user_no',
            key: 'user_no',
            onFilter: (value, record) => record.code.includes(value),
            sorter: (a, b) => a.code.length - b.code.length,
            sortOrder: sortedInfo.columnKey === 'code' ? sortedInfo.order : null,
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
        const data =
        {
            name: values.name,
            permissions_ids: checkList,
            status: 1
        }
        const edtData= [data, { id: values.id }];
        if (isEdit) {
            dispatch(updaterole(edtData)).unwrap().then(res => {
                setIsShow(true)
                setIsSucess(true)
                if ( res.status == 200) {
                    setToasterMessage("Roles updated successfully")
                    dispatch(getRole())
                } else {
                    setToasterMessage(res.data)
                }
            }).catch(err => {
                setIsShow(true)
                setIsSucess(false)
                setToasterMessage(err.data.message)
            })

        } else {
            dispatch(addRole(data)).unwrap().then(res => {
                setIsShow(true)
                setIsSucess(true)
                if (res.status == 201 || res.status == 200) {
                    setToasterMessage("Roles added successfully")
                    dispatch(getRole())
                } else {
                    setToasterMessage(res.data.message)
                }
            }).catch(err => {
                setIsShow(true)
                setIsSucess(false)
                setToasterMessage(err.data.message)
            })
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };

    return (
        <>
            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />
            <div className='title-with-btn'>
                <div className='title'>
                    <strong>Websites</strong>
                </div>
                <Button type="default" icon={<PlusOutlined />} size='middle' onClick={() => {
                    setOpen(true)
                    dispatch(resetCheckList())
                    form.setFieldsValue({
                        name: "",
                        sort: '',
                    });
                }}>Add New</Button>
            </div>
            <Drawer
                placement='right'
                closable={true}
                onClose={() => setOpen(false)}
                open={open}
                size='large'
            >
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

                            <Form.Item label="Name" name='name' rules={[
                                {
                                    required: true,
                                    message: 'Please insert Name',
                                },
                            ]}>
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
                    <GroupCheckbox title="Permissions" />
                    <Form.Item
                        className='text-center submit-btn'
                    >
                        <Button type="primary" htmlType="submit" className='border-hover border-primary'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Breadcrumb>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>name</Breadcrumb.Item>
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
                <Table className='theme-table'
                    scroll={{ x: 600 }}
                    rowSelection={{
                        type: Checkbox,

                    }} columns={columns} dataSource={dataSource} onChange={handleChange} />
            </div>

        </>
    );
}

export default Role;
