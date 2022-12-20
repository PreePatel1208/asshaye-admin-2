import { useField } from 'formik';
import React from 'react'
import ErrorMsg from './ErrorMessage';


const Select = ({ label, ...props }) => {
    const [field, meta] = useField(props);
  return (
    <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            <ErrorMsg name={props.name} />
    </div>
  )
}

export default Select