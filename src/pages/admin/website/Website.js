
import React, { useEffect, useState } from 'react';
import { Col, Row, Tabs, Breadcrumb, Button, Space, Modal, Table, Checkbox, Form, Input, Upload, Switch, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { addWebsite, deleteWebsite, editWebsite, getWebsites, restoreWebsite, trashWebsite } from '../../../store/reducer/websiteSlice';
import Toaster from '../../../components/Toaster/Toaster';
import Sample from './../../../assets/img/sample.png'
import Ckeditor from '../../../components/Editor/Editor'

const Website = () => {

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


    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const onChange = (key) => {
        setStatus(key)
        if (key == 'trash') {
            setText("Are you sure to delete this website permanant?")
        } else {
            setText("Are you sure to delete this website?")
        }
        dispatch(getWebsites(key))
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

    const deleteWebsites = async (id) => {
        console.log(status);
        await dispatch( deleteWebsite(id)).unwrap().then(res => {
            setIsShow(true)
            setIsSucess(true)
            if (res.status == 200) {
                setToasterMessage("Website deleted sucessfully")
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

    const restoreWebsiteDetail = async (id) => {
        await dispatch(restoreWebsite(id)).unwrap().then(res => {
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

    const editWebsiteDetail = async (element) => {
        setIsEdit(true)
        setIsAddModalOpen(true)
        form.setFieldsValue({
            website: element.title,
            sort: element.sort,
            id: element.encrypt_id
        });
    }
    const { Option } = Select;
    useEffect(() => {
        setDataSource(WebsitesData.map(element => (
            {
                key: element._id,
                image: <img src={"http://localhost:2500/uploads/"+element.image?.filename} alt="" height="100px" width="100px" />,
                body: <div dangerouslySetInnerHTML={{ __html: element.body }} /> ,
                title: element.title,
                slug: element.slug,
                created: element.created,
                logo: <img src={Sample} alt="" />,
                action:
                    <div>
                        <Button onClick={() => {
                            editWebsiteDetail(element)
                        }} className="action-btn edit-btn" ><EditOutlined /></Button>

                        <Popconfirm placement="right" title={text} onConfirm={() => { const id = element._id; deleteWebsites(id) }} okText="Yes" cancelText="No"><Button
                            className="action-btn delete-btn" ><DeleteOutlined /></Button> </Popconfirm>

                    </div>
            })))
    }, [WebsitesData])

    const columns = [
        {
            title: 'logo',
            dataIndex: 'logo',
            key: 'logo',
            ellipsis: true,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            ellipsis: true,
          
        },
        {
            title: 'slug',
            dataIndex: 'slug',
            key: 'slug',
            onFilter: (value, record) => record.slug.includes(value),
            sorter: (a, b) => a.slug.length - b.slug.length,
            sortOrder: sortedInfo.columnKey === 'slug' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            onFilter: (value, record) => record.title.includes(value),
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date',
            dataIndex: 'created',
            key: 'created',
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            ellipsis: true,
        },
        // {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     key: 'action',
        //     render: (element) => (
        //         <div>
        //             <Button onClick={() => {
        //             const id = element.id
        //             deleteWebsites(id)
        //         }} className="action-btn edit-btn" ><EditOutlined /></Button>
        //             <Button onClick={() => {
        //             editWebsiteDetail(element)
        //         }} className="action-btn delete-btn" ><DeleteOutlined /></Button>
        //         </div>
        //     )
        // }
    ];

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
    const onUpdateClick = (id) => {
        console.log(id);
    }
    const onDeleteClick = (id) => {
        console.log(id);
    }

    return (
        <>

            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />
            <div className='title-with-btn'>
                <div className='title'>
                    <strong>Websites</strong>
                </div>
                <Button type="default" icon={<PlusOutlined />} size='middle' onClick={() => {
                    setIsAddModalOpen(true);
                    form.setFieldsValue({
                        website: '',
                        sort: '',
                    });
                }}>Add New</Button>
            </div>

            <Breadcrumb>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Website</Breadcrumb.Item>
            </Breadcrumb>
            <div className='website-block theme-block'>
                {/* <Tabs
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
                /> */}
              
              <Table className='theme-table'
              scroll={{ x: 600 }}
              rowSelection={{
                  type: Checkbox,

              }} columns={columns} dataSource={dataSource} onChange={handleChange} />
              
                         
           
            </div>
            
      

        </>
    );
}

export default Website;
