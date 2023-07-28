import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useNotification from '../snackbars/SnackBar'
import Cookies from 'js-cookie';

function Home() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [conf,setConf] = useNotification();

  const location = useLocation();

  const receivedData = location.state;

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    // Check if a token exists in the cookies
    const token = Cookies.get('token');

    if (token) {
      // You may want to check if the token is expired here
      // For simplicity, we'll assume the token is valid for now
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  },[]);


  const handleLogout = (event) => {
    Cookies.remove('token');
    setLoggedIn(false);
  }

  return (
    <div className='container mt-4'> 
      {
        loggedIn ? 
        <div>
          <h3>You are logged In {receivedData?.name}</h3>
          <h4>{receivedData?.email}</h4>
          <h4>{receivedData?.phone}</h4>
          <button className='btn btn-danger' onClick={handleLogout} >logout</button>
        </div>
        :
        <div>
          <h3>You are not logged In</h3>
          <Link to="/login" className='btn btn-primary'>Login Now</Link>
        </div>
      }
    </div>
  )
}

export default Home