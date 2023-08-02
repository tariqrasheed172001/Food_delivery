import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Pages/Home";

function ProtectedResetPassword() {
  const flag = useSelector((state) => state.flag);
  return <div>{flag ? <Outlet /> : <Home />}</div>;
}

export default ProtectedResetPassword;
