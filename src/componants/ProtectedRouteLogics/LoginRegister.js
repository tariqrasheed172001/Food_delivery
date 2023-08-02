import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Home from '../Pages/Home';


function LoginRegister() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div>{(!login) ? <Outlet /> : <Home /> }</div>
  )
}

export default LoginRegister