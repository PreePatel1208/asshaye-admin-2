import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Footers from './admin/dashboard/footer';
import './Layout.css';
import { Outlet } from 'react-router-dom';


import { Layout } from 'antd';
const { Content } = Layout

const LayoutCompo = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [resToggle, setresToggle] = useState(false);


    return (
        <Layout className={resToggle ? 'sidebar-open' : null}>
            <Sidebar toggleMenu={collapsed} resMenuClose={() => setresToggle(false)} />
            <Layout className="site-layout main-content">
                <Header toggleCatch={() => {
                    if (window.innerWidth <= 991) {
                        setresToggle(!resToggle)
                    } else {
                        setCollapsed(!collapsed)
                    }
                }} />
                <Content
                    className="site-layout-background"
                    style={{

                        padding: 24,

                    }}
                >
                    <Outlet />
                </Content>
                <Footers />
            </Layout>
        </Layout>
    );
}

export default LayoutCompo;
