import  Home  from '../Pages/Home';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';

function LoginRegister() {
  const [auth,setAuth] = useState(false);
  useEffect(()=>{
    const token = Cookies.get('token');
    if(token)
        setAuth(true);
    else 
        setAuth(false);
  },[])
  return (
    <div>{!auth ? <Outlet /> : <Home />}</div>
  )
}

export default LoginRegister