import React from "react";
import { useSelector } from "react-redux";
import Home from "../Pages/Home";
import { Outlet } from "react-router-dom";

function ProtectedOtproute() {
  const flag = useSelector((state) => state.flag);
  return <div>{flag ? <Outlet /> : <Home />}</div>;
}

export default ProtectedOtproute;
