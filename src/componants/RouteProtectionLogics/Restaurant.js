import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';
import Login from "../authentication/Login/Login";

function Restaurant() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setAuth(true);
    else setAuth(false);
  }, []);
  return <div>{auth ? <Outlet /> : <Login />}</div>;
}

export default Restaurant;
