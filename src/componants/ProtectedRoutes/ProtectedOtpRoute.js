
import React from 'react'
import { useSelector } from 'react-redux';
import Login from '../authentication/Login';
import { Outlet } from 'react-router-dom';

function ProtectedOtproute() {
    const otpFlag = useSelector((state) => state.otpFlag);
    return (
      <div>
          {otpFlag ? <Outlet /> : <Login />}
      </div>
    )
}

export default ProtectedOtproute