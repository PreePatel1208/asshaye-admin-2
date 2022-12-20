// imports
import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import CustomCheckboxGroup from './CustomChceckBox'
import { useDispatch, useSelector } from 'react-redux'
import { countriesChecklist, websiteChecklist } from '../../store/reducer/permissionSlice'

const Example = () => {
  
  const [websites, setWebsites] = useState([])
  const dispatch=useDispatch()
  const [countries, setCountries] = useState([])
  const webPermission=useSelector((state)=>state.permission.websitesPermission)
  const counPermission=useSelector((state)=>state.permission.countriesPermission)
  const abc=useSelector((state)=>state.permission.countries)
  const [formValues, setFormValues] = useState([])
  useEffect(() => {
    dispatch(websiteChecklist(websites))
  }, [websites])
  useEffect(() => {
    dispatch(countriesChecklist(countries))
   
  }, [countries])

  useEffect(() => {
  
    setFormValues({
      webPermission: webPermission,
      checkedwebPermission: [],
      counPermission: counPermission,
      checkedcounPermission:[]
    })
  }, [])

  // main component
  return (
    <>
      <Row gutter={16}>
      <Col span={5}>
        <div className='checkbox-label'>
          {'Website'}
        </div>
        <div className='checkbox-label'>
          {'Countries'}
        </div> 
        <div className='checkbox-label'>
          {'Corporates'}
        </div>  
        <div className='checkbox-label'>
          {'Instructors'}
        </div>
        <div className='checkbox-label'>
          {'Programs'}
        </div> 
        <div className='checkbox-label'>
          {'Requests'}
        </div>
        <div className='checkbox-label'>
          {'Certificates'}
        </div>
        <div className='checkbox-label'>
          {'Admins'}
        </div>
        <div className='checkbox-label'>
          {'Roles'}
        </div>
        <div className='checkbox-label'>
          {'emailTeplate'}
        </div>
        <div className='checkbox-label'>
          {'RequestCountries'}
        </div>
        <div className='checkbox-label'>
          {'RequestWebsites'}
        </div>
        RequestCountries
      </Col>
        <Col span={12}>    
          <CustomCheckboxGroup
            values={formValues.webPermission}
            defaultCheckedList={formValues.checkedwebPermission}
            groupState={setWebsites}
          />
        </Col>
        </Row>
      
    </>
  )
}

export default Example
