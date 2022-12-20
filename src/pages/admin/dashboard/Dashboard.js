import React, { Component, useEffect, useState } from 'react';
import { Col, Row, Card, Typography, Space } from 'antd';
import SurveyCard from '../../../components/surveycard/SurveyCard';
import WebsiteIcon from '../../../assets/img/web.png'
import Earth from '../../../assets/img/earth.png'
import Corporate from '../../../assets/img/portfolio.png'
import Instructors from '../../../assets/img/instructor.png'
import Program from '../../../assets/img/program.png'
import Request from '../../../assets/img/reques.png'
import Income from '../../../assets/img/income.png'
import IncomeStats from '../../../assets/img/evaluation.png'
import { Area, Column, Gauge, Pie } from '@ant-design/plots';

const Dashboard = () => {
    const [colomnData, setColomnData] = useState([]);

    const cardData = [
        {
            title: 'Total Website',
            count: '2',
            image: WebsiteIcon,
        },
        {
            title: 'Total Countries',
            count: '1',
            image: Earth,
        },
        {
            title: 'Total Corporates',
            count: '3',
            image: Corporate,
        },
        {
            title: 'Total Instructors',
            count: '3',
            image: Instructors,
        },
        {
            title: 'Total Programs',
            count: '0',
            image: Program,
        },
        {
            title: 'Total Requests',
            count: '0',
            image: Request,
        },
        {
            title: 'Total Income',
            count: '0',
            image: Income,
        },
        {
            title: 'Reset of Income',
            count: '0',
            image: IncomeStats,
        },
    ]
    const data = [{
        "timePeriod": "2006 Q3",
        "value": 0.5
    },
    {
        "timePeriod": "2006 Q4",
        "value": 1.0
    },
    {
        "timePeriod": "2007 Q1",
        "value": 1.5
    },
    {
        "timePeriod": "2007 Q2",
        "value": 1.06
    },
    {
        "timePeriod": "2007 Q3",
        "value": 1.6
    },
    {
        "timePeriod": "2007 Q4",
        "value": 1.5
    },
    {
        "timePeriod": "2008 Q1",
        "value": 1.52
    },
    {
        "timePeriod": "2008 Q2",
        "value": 1.4
    },
    {
        "timePeriod": "2008 Q3",
        "value": 1.0
    }]

    const areaConfig = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        height: 250,
        xAxis: {
            range: [0, 1],
        },
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#869ed1 1:#18233a',
            };
        },
        point: {
            size: 5,
            shape: 'diamond',
            color: '#18233a'
        },
        smooth: true,
        line: {
            color: '#18233a'
        }
    };

    const colConfig = {
        data: colomnData,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };

    const pieConfig = {
        appendPadding: 10,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
        legend: {
            layout: 'horizontal',
            position: 'bottom'
        }
    };

    useEffect(() => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
            .then((response) => response.json())
            .then((json) => setColomnData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    }, []);

    return (
        <div className='master-wrapper'>
            <Row gutter={16}>
                <Col lg={15} md={24} className='gutter-row'>
                    <div className='survey-card-block'>
                        {cardData.map(data => {
                            return <SurveyCard
                                title={data.title}
                                count={data.count}
                                image={data.image}
                            />
                        })}
                    </div>
                    <div className='appexchart-block theme-block'>
                        <Area {...areaConfig} />
                    </div>
                    <div className='appexchart-block theme-block'>
                        <Column {...colConfig} />
                    </div>
                </Col>
                <Col lg={9} md={24} className='gutter-row'>
                    <div className='appexchart-block theme-block'>
                        <Pie data={[
                            {
                                type: '分类一',
                                value: 27,
                            },
                            {
                                type: '分类二',
                                value: 25,
                            },
                            {
                                type: '分类三',
                                value: 18,
                            },
                            {
                                type: '分类四',
                                value: 15,
                            },
                            {
                                type: '分类五',
                                value: 10,
                            },
                            {
                                type: '其他',
                                value: 5,
                            },
                        ]} {...pieConfig} />
                    </div>
                </Col>
            </Row>
            {/* <div className='appexchart-block'>
                <Row gutter={16}>
                    <Col className='gutter-row' span={12}>
                        <div className='theme-block '>
                            <Column {...colConfig} />
                        </div>
                    </Col>
                    <Col className='gutter-row' span={12}>
                        <div className='theme-block'>
                            <Pie data={[
                                {
                                    type: '分类一',
                                    value: 27,
                                },
                                {
                                    type: '分类二',
                                    value: 25,
                                },
                                {
                                    type: '分类三',
                                    value: 18,
                                },
                                {
                                    type: '分类四',
                                    value: 15,
                                },
                                {
                                    type: '分类五',
                                    value: 10,
                                },
                                {
                                    type: '其他',
                                    value: 5,
                                },
                            ]} {...pieConfig} />
                        </div>
                    </Col>
                </Row>
            </div> */}
        </div>
    );
}

export default Dashboard;
