import React from 'react'
import { ErrorMessage } from 'formik'

const ErrorMsg = ({name}) => {
    return (
        <div style={{ color: "red" }}>
            <ErrorMessage name={name} />
        </div>
    )
}

export default ErrorMsg