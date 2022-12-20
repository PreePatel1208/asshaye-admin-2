import { Spin } from 'antd';
import React from 'react';
import './loader.css'
import { useDispatch, useSelector } from 'react-redux';

const Loader = (props) => {
    const isLoad = useSelector((state) => state.users.isLoad)
    const dispatch = useDispatch()
    if (isLoad) {
        return (<div className='loader'>
            <Spin />
        </div>)
    }
}

export default Loader;