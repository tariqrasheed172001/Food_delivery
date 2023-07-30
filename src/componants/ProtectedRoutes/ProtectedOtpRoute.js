import React from "react";
import { useSelector } from "react-redux";
import Home from '../Home/Home';
import { Outlet } from "react-router-dom";

function ProtectedOtproute() {
  const otpFlag = useSelector((state) => state.otpFlag);
  return <div>{otpFlag ? <Outlet /> : <Home />}</div>;
}

export default ProtectedOtproute;
