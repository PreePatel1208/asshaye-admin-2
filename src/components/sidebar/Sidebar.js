import React from 'react';
import Icon, {
    DesktopOutlined,
    MailOutlined,
    PieChartOutlined,
    CloseOutlined,
    GlobalOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons'
import Logo from '../../assets/img/logo.png'
import './sidebar.css'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom';
import { ReactComponent as Country } from '../../assets/img/svg-icons/countries.svg'
import { ReactComponent as Corporates } from '../../assets/img/svg-icons/Corporates.svg'
import { ReactComponent as Instructor } from '../../assets/img/svg-icons/instructor.svg'
import { ReactComponent as Programes } from '../../assets/img/svg-icons/programs.svg'


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(<Link to="/dashboard">Application</Link>, '1', <PieChartOutlined />),
    getItem(<Link to="/posts">Posts</Link>, '2', <GlobalOutlined />),
    getItem(<Link to="/comment">Comment</Link>, '3', <Icon component={Country} />),
    // getItem('Requests', 'sub1', <MailOutlined />, [
    //     getItem('Client List', '5'),
    //     getItem('Certificate', '6'),
    //     getItem('New Country', '7'),
    //     getItem('New Website', '8'),
    //     getItem('Admin Country', '9'),
    //     getItem('Admin Website', '10'),
    // ]),
    // getItem('Corporates', '11', <Icon component={Corporates} />),
    // getItem('Instructors', '12', <Icon component={Instructor} />),
    // getItem('Programs', '13', <Icon component={Programes} />),
    // getItem('Admin', '14', <DesktopOutlined />),
    // getItem(<Link to="/roles">Roles</Link>, '15', <DesktopOutlined />),
    // getItem('Email Templates', '16', <DesktopOutlined />),

];
const Sidebar = (props) => {

    return (
        <Layout.Sider className='sidebar' trigger={null} theme='light' collapsible collapsed={props.toggleMenu}
            breakpoint="lg"
            collapsedWidth="0"
        >
            <button className='ant-btn btn-close' onClick={() => props.resMenuClose()}>
                <CloseOutlined />
            </button>
            <img src={Logo} alt="logo" height='65px' style={{ display: 'block', margin: 'auto' }} />
            <Menu className='sideNav-Menu'
                mode="inline"
                defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                items={items}
            />
        </Layout.Sider>

    );
}

export default Sidebar;
