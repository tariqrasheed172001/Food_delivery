import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from '../Home/Home';

function ProtectedResetPassword() {
  const resetPasswordFlag = useSelector((state) => state.resetPasswordFlag);
  return <div>{resetPasswordFlag ? <Outlet /> : <Home />}</div>;
}

export default ProtectedResetPassword;
