import { useField } from 'formik';
import React from 'react'
import ErrorMsg from './ErrorMessage';

const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);

  return (
    <>
    <label htmlFor={props.id || props.name}>{label}</label>
    <input className="text-input" {...field} {...props} />
    <ErrorMsg name={props.name} />

</>
  )
}

export default Input