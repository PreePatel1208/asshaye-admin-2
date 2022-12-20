import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from '../pages/Auth/auth';
import EmailVerification from '../pages/Auth/emailVerification/EmailVerification';
import ForgotPassword from '../pages/Auth/forgotPassword/ForgotPassword';
import Login from '../pages/Auth/login/login';
import Registration from '../pages/Auth/registration/Registration';
import ResetPassword from '../pages/Auth/resetPassword/ResetPassword';
import Dashboard from '../pages/admin/dashboard/Dashboard'
import ClientRegister from '../pages/Auth/registration/Client/ClientRegister';
import PersonalDetail from '../pages/Auth/registration/PersonalDetail';
import AddressDetail from '../pages/Auth/registration/AddressDetail';
import PrivateRoute from '../helper/PrivateRoute';
import Website from '../pages/admin/website/Website';
import AddPost from '../pages/admin/website/AddPost';
import Country from '../pages/admin/country/Country';
import Role from '../pages/admin/roles/Role';

const Router = () => {
  const getuser = localStorage.getItem('userAuthToken')
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path='auth' element={<Auth />}>
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='client-register' element={<ClientRegister />} />
          <Route path='personal-detail' element={<PersonalDetail />} />
          <Route path='employee-register' element={<ClientRegister />} />
          <Route path='address-detail' element={<AddressDetail />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='email-verification' element={<EmailVerification />} />
        </Route>
        <Route path='/' element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/' element={getuser ? <Navigate to="/dashboard" replace={true} /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path="/posts" element={<Website />} />
          <Route path="/posts/create" element={<AddPost />} />
          <Route path="/comment" element={<Country />} />  
        </Route>
      </Routes>
    </>

  )
}

export default Router