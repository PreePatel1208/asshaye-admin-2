import React from 'react';
import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';

import { IonProgressBar } from '@ionic/react'




const Auth = () => {
    return (
        <>

            <div className='auth-bg'>
                <Row justify='center'>
                    <Col span={24}>
                        <div className='login-block'>
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Auth;
