import React, { useEffect } from 'react'
import { CheckCircleTwoTone, CloseCircleTwoTone, SmileOutlined } from '@ant-design/icons';
import { notification, message } from 'antd';

export const Toaster = ({setIsShow,isSucess,message,isShow}) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if(isShow)
 {   api.open({
        message: '',
        description: message,
        icon:isSucess?<CheckCircleTwoTone twoToneColor="#52c41a" /> :<CloseCircleTwoTone  twoToneColor="#eb2f96"/>,
      });
      setIsShow(false)
    }
  }, [isShow])
  
   
    return (
        <>
           {contextHolder}
         
        </>
      );
}

export default Toaster

