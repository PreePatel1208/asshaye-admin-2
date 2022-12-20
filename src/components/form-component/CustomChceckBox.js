// imports
import React, { useState, useEffect } from 'react'
import { Checkbox, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setCheckList } from '../../store/reducer/permissionSlice'

const CustomCheckboxGroup = ({ values, defaultCheckedList, groupState }) => {

  const [state, setState] = useState({
    values: [],
    checkedList: [],
    indeterminate: false,
    checkAll: false
  })
  const checkedList = useSelector((state) => state.permission.checkedList)
 
  const [allValuesChecked, setAllValuesChecked] = useState([])
const dispatch=useDispatch()
  useEffect(() => {
    if (values) {
      const formattedValues = values.map(value => {
        return ({ label: value.type_name, value: value.id })
      })
      const formattedCheckedList = defaultCheckedList.map(value => { return value.id })
      setAllValuesChecked(() => {
        return values.map(value => { return value.id })
      })
      setState({
        values: formattedValues,
        checkedList: formattedCheckedList,
        indeterminate: !!formattedCheckedList,
        checkAll: false
      })
    }
  }, [values])

  useEffect(() => {
    if (groupState) {
      groupState({ ...state })
    }
  }, [state])

  function onChange (checkedList) {
    console.log("checkedList",checkedList);
    dispatch(setCheckList(checkedList)) 
    return setState({
      ...state,
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < values.length,
      checkAll: checkedList.length === values.length
    })
  }

  function onCheckAllChange (e) {
    return setState({
      ...state,
      checkedList: e.target.checked ? allValuesChecked : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }

  return (
    <>
      <Row>
        <Col span={16} className='outer-border'>
          <div className='ant-checkbox-group-item'>
            <Checkbox
              className='checkbox-header'
              indeterminate={state.indeterminate}
              onChange={onCheckAllChange}
              checked={state.checkAll}
              style={{marginBottom: '20px'}}
            >
              {state.checkAll ? 'Uncheck All' : 'Check All'}
            </Checkbox>
          </div>
          <Checkbox.Group
            className='checkbox-group'
            options={state.values}
            value={checkedList}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  )
}

export default CustomCheckboxGroup
