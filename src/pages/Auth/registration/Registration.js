
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Step3 from './AddressDetail';
import Step2 from './PersonalDetail';
import Step1 from './UserInfo';

const Registration = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const step = useSelector((state) => state.step.registerStep)
    useEffect(() => {


    }, [])

    const [formData, setFormData] = useState({
        userType: null,
        clientType: null,
        fullName: "",
        ownerOfInstitute: "",  
       instituteName: "",  
       websiteUrl: "",  
        userName: "",
        password: "",
        cpassword: "",
        email: "",
        streetAddress: "",
        zipcode: "",
        state: "",
        city: "",
        country: null,
        phoneNo: "",
    })
    


    return (
        <>
        {step == 1 &&
            <Step1

                formData={formData}
                setFormData={setFormData}
            />
        }
            {step == 2 &&
                <Step2
                    formData={formData}
                    setFormData={setFormData}
                />
            }
            {step == 3 &&
                <Step3
                    formData={formData}
                    setFormData={setFormData}
                />
            }

        </>
    );
}

export default Registration;
