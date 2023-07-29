import React from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../authentication/Login';

function ProtectedResetPassword() {

  const resetPasswordFlag = useSelector((state) => state.resetPasswordFlag);
  return (
    <div>{resetPasswordFlag ? <Outlet /> : <Login />}</div>
  )
}

export default ProtectedResetPassword