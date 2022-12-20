import { useField } from 'formik';
import React from 'react'
import ErrorMsg from './ErrorMessage';

const CheckBox = ({ label, children, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            <ErrorMsg name={props.name} />

        </div>
    )
}

export default CheckBox