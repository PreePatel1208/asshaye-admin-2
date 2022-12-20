import { Row, Col } from 'antd';
import React from 'react';

const Footer = () => {
    return (
        <footer className='footer'>
            <Row gutter={16} justify="space-between">
                <Col className="gutter-row foot-left" sm={6}>
                    <span>
                        Copyright 2021  © <a href='/'>AGMEP</a>
                    </span>
                </Col>
                <Col className="gutter-row foot-right" sm={6}>
                    <span>
                        All Rights Reserved
                    </span>
                </Col>

            </Row>
        </footer>
    );
}

export default Footer;
