import React, { useEffect, useState } from 'react';
import './header.css';
import { Input, Dropdown, Menu, Space, Drawer, Table, Button } from 'antd';
import { DownOutlined, SearchOutlined, MenuFoldOutlined, WalletOutlined, CaretDownOutlined, AlignRightOutlined, CloseOutlined, RightOutlined, GlobalOutlined, ExportOutlined } from '@ant-design/icons';
import userImg from '../../assets/img/sample.png'
import { useDispatch, useSelector } from 'react-redux';
import { Logout, UserLogout } from '../../store/reducer/UserSlice1';
import { useNavigate } from 'react-router-dom';
import Toaster from '../Toaster/Toaster';
import $ from 'jquery'
import { getCountry } from '../../store/reducer/countrySlice';
import { getWebsites } from '../../store/reducer/websiteSlice';

const Header = (props) => {
    const [classToggle, setClassToggle] = useState(false);
    const [webDrawer, setWebDrawer] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const [toasterMessage, setToasterMessage] = useState("")
    const [isSucess, setIsSucess] = useState(false)
 const countries= useSelector((state) => state.country.countries)
    const [countriesdata, setCountriesdata] = useState(null)
    const WebsitesData = useSelector((state) => state.website.websites)
  const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        dispatch(getCountry())
        dispatch(getWebsites())
    }, [])

    useEffect(() => {
        setDataSource(WebsitesData.map(element => (
            {
                key: element.id,
                image: element.image?.url,
                website: element.title,
                code:element.title,
                url: 'aips',
            })))

    }, [WebsitesData])
    useEffect(() => {
        setCountriesdata(countries?.map(element => (
            {
                key: element.id,
                label: (
                    <p className='country-link-wrapper'>
                        <span>{element.title}</span>
                    </p>
                ),
                icon: <span className="flag-icon flag-icon-ye"></span>,
                title: element.title
            })))

    }, [countries])

    const [searchText, setSearchText] = useState('');

    const [responsiveSwiper, setresponsiveSwiper] = useState(false);
    const menu = (
        <Menu
            items={countriesdata }
            className="country-dropdown-menu"
        />
    );

    const loginintoWebsite = (id) => {

    }
    const handleLogout = () => {
        dispatch(UserLogout()).unwrap().then(res => {
            if (res.status == 200) {
                localStorage.removeItem("userAuthToken")
                navigate("/auth/login")
            }
            else {
                setIsShow(true)
                setIsSucess(false)
                setToasterMessage(res.data.error)
            }
        }).catch(err => {

        })
    }

    const columns = [
        {
            title: 'Logo',
            dataIndex: 'image',
            render: link => <div className='websiteLogo'>{link ? <img src={link} /> : null}</div>
        },
        {
            title: 'Website',
            dataIndex: 'website',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Code',
            dataIndex: 'code',
        }, {
            title: 'Action',
            dataIndex: 'url',
            render: text => <Button onClick={() => loginintoWebsite(text)} type="primary" icon={<ExportOutlined />} size='small' />
        }
    ];
    const items = [
        {
            label: <a href="https://www.antgroup.com">Update Profile</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">View Profile</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <a onClick={handleLogout}>Logout</a>,
            key: '3',
        },
    ];

    const searchHandler = () => {

        return dataSource?.filter(a =>
            a.website
                .toLocaleLowerCase()
                .includes(searchText.toLowerCase()) ||
            a.code
                .toLocaleLowerCase()
                .includes(searchText.toLowerCase())
        );
    }


    const [responsOpen, setResponsOpen] = useState();

    const onResClose = () => {
        setResponsOpen(false);
    };


    useEffect(() => {
        if (window.innerWidth <= 991) {
            $('.header-block:nth-child(2),.header-block:nth-child(3),.header-block:nth-child(4),.header-block:nth-child(5)').appendTo('.responsive-swiper');
        }
    }, [window.innerWidth]);
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    return (
        <>
            <Toaster setIsShow={setIsShow} message={toasterMessage} isSucess={isSucess} isShow={isShow} />
            <div className='header'>
                <div className='header-left'>
                    <div className='header-block'>
                        <button className='drawer-btn ant-btn' onClick={() => props.toggleCatch()}>
                            <MenuFoldOutlined style={{ fontSize: '24px' }} />
                        </button>
                    </div>
                </div>
                <div className='header-right'>

                    <div className='header-block'>
                        <Dropdown overlay={menu}>
                            <a onClick={(e) => {e.preventDefault();dispatch(getCountry()) }}>
                                <Space>
                                    All Countries
                                    <CaretDownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <div className='header-block'>
                        <div onClick={() => {setOpen(true); }}>
                            Website
                        </div>
                        <Drawer
                            placement='right'
                            closable={true}
                            onClose={() => setOpen(false)}
                            open={open}
                            size='large'

                        >

                            <Input
                                prefix={<SearchOutlined className="site-form-item-icon" />}
                                size='large'
                                placeholder="Search website or code"
                                style={{ marginBottom: '20px', width: '100%', maxWidth: '300px' }}
                                onChange={(e) => setSearchText(e.target.value)} />
                            <Table columns={columns} dataSource={searchHandler()} pagination={false} />
                        </Drawer>
                    </div>
                    <div className='header-block'>
                        <Space size={10}>
                            <WalletOutlined />
                            <span>-4550.00</span>
                        </Space>
                    </div>
                    <div className='header-block'>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <img src={userImg} />
                                    Super Admin
                                    <CaretDownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    {window.innerWidth <= 991 ? (
                        <div className='responsive-block' >
                            <div className='responsive-swiper-btn' onClick={() => setresponsiveSwiper(!responsiveSwiper)}>
                                <AlignRightOutlined />
                            </div>
                            <div className={responsiveSwiper ? 'responsive-swiper open' : 'responsive-swiper'}>
                                <div className='swiperClose'>
                                    <CloseOutlined />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className='header-right-responsive'>
                    <button className='hr-btn' onClick={() => setResponsOpen(!responsOpen)}>
                        <AlignRightOutlined />
                    </button>
                    <Drawer
                        width='320px'
                        className='respo-drawer'
                        placement="right"
                        onClose={onResClose}
                        open={responsOpen}
                    >
                        <div className='hr-swipper-block'>
                            <Space className='profile-block'>
                                <div className='profile-image'>
                                    <img src={userImg} />
                                </div>
                                <div className='profile-desc'>
                                    Super Admin
                                    <RightOutlined />
                                </div>
                            </Space>
                        </div>
                        <div className='hr-swipper-block'>
                            <div className={classToggle ? 'search-result show' : 'search-result'}>
                                <Input placeholder="Search here" />
                                <svg width="14" height="14" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className='hr-swipper-block' onClick={() => setWebDrawer(!webDrawer)}>
                            <div className='hrs-inner'>
                                <span className='hrs-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z" />
                                    </svg>
                                    All Countries
                                </span>
                                <span><RightOutlined /></span>
                            </div>
                        </div>
                        <Drawer
                            className='respo-drawer'
                            title="All Countries"
                            placement="right"
                            onClose={() => setWebDrawer(false)}
                            open={webDrawer}>
                            <Menu mode="vertical" items={[
                                getItem('Yemen', '1'),
                                getItem('United States of America', '2'),
                                getItem('United Arab Emirates', '3'),
                            ]} />
                        </Drawer>
                        <div className='hr-swipper-block'>
                            <div className='hrs-inner'>
                                <span className='hrs-icon'>
                                    <GlobalOutlined />
                                    Websites
                                </span>
                                <span><RightOutlined /></span>
                            </div>
                        </div>
                        <div className='hr-swipper-block'>
                            <div className='hrs-inner'>
                                <Space size={10}>
                                    <span className='hrs-icon'>

                                        <WalletOutlined />
                                        -4550.00
                                    </span>
                                </Space>

                            </div>
                        </div>
                    </Drawer>

                </div>
            </div>
        </>
    );
}

export default Header;
